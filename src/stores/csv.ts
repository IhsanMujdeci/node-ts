import { readFileSync, writeFileSync, appendFileSync, watchFile } from "fs";
import {
  listenerCallback,
  Operation,
  Repository,
  Subscribable,
  WriteType,
} from "@app/sync/broadcaster";
import { UserEntity } from "@app/entity/user";
import * as stream from "stream";

export class UserCSVStore
  implements Repository<UserEntity>, Subscribable<UserEntity>
{
  private listener: listenerCallback<UserEntity>[] = [];
  fileWriteEmitter = new stream.Readable({
    read(size: number) {},
    objectMode: true,
  });

  constructor(private readonly path: string = "../store.csv") {
    writeFileSync(this.path, "id,name,interests");

    watchFile(path, (curr, prev) => {
      console.log(`the previous mtime was: ${prev.mtime}`);
    });
    this.updateLoop();
  }

  addListener(cb: listenerCallback<UserEntity>) {
    this.listener.push(cb);
  }

  broadcast(e: UserEntity, broadCastType: Operation) {
    for (const l of this.listener) {
      l(e, broadCastType);
    }
  }

  private async updateLoop() {
    for await (const rawEvent of this.fileWriteEmitter) {
      const event: {
        userEntity: UserEntity;
        writeType: WriteType;
        operation: Operation;
      } = JSON.parse(rawEvent.toString());

      switch (event.operation) {
        case Operation.CREATE:
          this.internalCreate(event.userEntity, event.writeType);
          break;
        case Operation.UPDATE:
          this.internalUpdate(event.userEntity, event.writeType);
          break;
        default:
          console.log(
            "Unexpected event operation",
            event.operation,
            "in csv store.",
            event
          );
      }
    }
  }

  private async internalUpdate(e: UserEntity, writeType: WriteType) {
    const file = readFileSync(this.path);

    const lines = file.toString().split("\n");
    for (const i in lines) {
      const [id] = i.split(",");
      if (id === e.id) {
        lines[i] = `${e.id},${e.name},${e.interests.join("__")}`;
      }
    }

    const newFile = lines.join("\n");
    writeFileSync(this.path, newFile);
    if (writeType === WriteType.SOURCE) {
      this.broadcast(e, Operation.UPDATE);
    }
  }

  async update(e: UserEntity, writeType: WriteType): Promise<UserEntity> {
    this.fileWriteEmitter.push(
      JSON.stringify({
        userEntity: e,
        writeType,
        operation: Operation.UPDATE,
      })
    );
    return e;
  }

  async create(e: UserEntity, writeType: WriteType): Promise<UserEntity> {
    this.fileWriteEmitter.push(
      JSON.stringify({
        userEntity: e,
        writeType,
        operation: Operation.CREATE,
      })
    );
    return e;
  }

  private internalCreate(e: UserEntity, writeType: WriteType) {
    appendFileSync(this.path, `\n${e.id},${e.name},${e.interests.join("__")}`);
    if (writeType === WriteType.SOURCE) {
      this.broadcast(e, Operation.UPDATE);
    }
  }
}
