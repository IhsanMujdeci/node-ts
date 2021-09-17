import {
  Operation,
  listenerCallback,
  Repository,
  Subscribable,
  WriteType,
} from "@app/sync/broadcaster";
import { UserEntity } from "@app/entity/user";

export class UserInMemoryStore
  implements Repository<UserEntity>, Subscribable<UserEntity>
{
  private store: Record<string, UserEntity> = {};
  private listener: listenerCallback<UserEntity>[] = [];

  addListener(cb: listenerCallback<UserEntity>) {
    this.listener.push(cb);
  }

  broadcast(e: UserEntity, broadCastType: Operation) {
    for (const l of this.listener) {
      l(e, broadCastType);
    }
  }

  async update(e: UserEntity, writeType: WriteType): Promise<UserEntity> {
    const existingUser = this.read(e.id);
    if (!existingUser) {
      throw new Error("not found");
    }
    this.store[e.id] = e;
    if (writeType === WriteType.SOURCE) {
      this.broadcast(e, Operation.UPDATE);
    }
    return e;
  }

  async create(e: UserEntity, writeType: WriteType): Promise<UserEntity> {
    this.store[e.id] = e;
    if (writeType === WriteType.SOURCE) {
      this.broadcast(e, Operation.CREATE);
    }
    return e;
  }

  async read(id: string): Promise<UserEntity | undefined> {
    return this.store[id];
  }
}
