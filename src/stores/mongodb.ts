import * as Mongo from "mongodb";
import {
  listenerCallback,
  Operation,
  Repository,
  Subscribable,
  WriteType,
} from "@app/sync/broadcaster";
import { UserEntity, UserEntityDTO } from "@app/entity/user";

type MongoUserEntityDTO = Omit<UserEntityDTO, "id"> & {
  _id: Mongo.ObjectId;
  writeType: WriteType;
};

export class UserMongo
  implements Repository<UserEntity>, Subscribable<UserEntity>
{
  private collection: Mongo.Collection;
  private listener: listenerCallback<UserEntity>[] = [];

  constructor(private readonly db: Mongo.Db) {
    this.collection = db.collection("user");
    this.streamWatch();
  }

  /**
   * Wathces the collection for any insert and updates and broadcasts them out to and listeners
   */
  async streamWatch() {
    const stream = this.collection.watch(
      [
        {
          $match: {
            operationType: { $in: ["insert", "update"] },
            "fullDocument.writeType": WriteType.SOURCE,
          },
        },
      ],
      { fullDocument: "updateLookup" }
    );
    // Weird enough the stream.hasNext returns void | Promise<void> which isn't in line with my testing
    while ((await stream.hasNext()) as unknown as Promise<boolean>) {
      const nextStream = await stream.next();

      if (nextStream.operationType === "insert") {
        this.broadcast(
          UserMongo.toEntity(nextStream.fullDocument as MongoUserEntityDTO),
          Operation.CREATE
        );
      }
      if (nextStream.operationType === "update") {
        this.broadcast(
          UserMongo.toEntity(nextStream.fullDocument as MongoUserEntityDTO),
          Operation.UPDATE
        );
      }
    }
  }

  addListener(cb: listenerCallback<UserEntity>): void {
    this.listener.push(cb);
  }

  broadcast(e: UserEntity, operationType: Operation): void {
    for (const l of this.listener) {
      l(e, operationType);
    }
  }

  async create(e: UserEntity, writeType: WriteType): Promise<UserEntity> {
    await this.collection.insertOne(UserMongo.fromDTO(e, WriteType.SINK));
    if (writeType === WriteType.SOURCE) {
      this.broadcast(e, Operation.CREATE);
    }
    return e;
  }

  static fromDTO(d: UserEntityDTO, writeType: WriteType): MongoUserEntityDTO {
    return {
      _id: new Mongo.ObjectId(d.id),
      name: d.name,
      interests: d.interests,
      writeType,
    };
  }

  static toEntity(m: MongoUserEntityDTO): UserEntity {
    return new UserEntity(m._id.toString(), m.name, m.interests);
  }

  async update(e: UserEntity, writeType: WriteType): Promise<UserEntity> {
    await this.collection.updateOne(
      { _id: new Mongo.ObjectId(e.id) },
      { $set: UserMongo.fromDTO(e, writeType) }
    );
    if (writeType === WriteType.SOURCE) {
      this.broadcast(e, Operation.UPDATE);
    }
    return e;
  }
}

export function makeMongoDB(uri: string, dbName: string): Promise<Mongo.Db> {
  return new Promise((resolve, reject) => {
    const client = new Mongo.MongoClient(uri);
    client.connect((err) => {
      if (err) {
        return reject(err);
      }
      const db = client.db(dbName);
      resolve(db);
    });
  });
}
