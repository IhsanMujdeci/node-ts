import { makeMongoDB, UserMongo } from "@app/stores/mongodb";
import { UserEntity } from "@app/entity/user";
import { Operation, WriteType } from "@app/sync/broadcaster";
import mongo, { ObjectId } from "mongodb";

describe("mongo tests", () => {
  let userMongo: UserMongo;
  let client: mongo.Db;

  beforeAll(async () => {
    client = await makeMongoDB(
      process.env.MONGO_URI || "",
      process.env.MONGO_DB_NAME || ""
    );

    userMongo = new UserMongo(client);
  });

  it("Should try and create and well see what happens", async (cb) => {
    const id = new ObjectId().toString();
    userMongo.addListener((e, o) => {
      console.log(e);
      expect(e.getPrimaryKey()).toEqual(id);
      expect(o).toEqual(Operation.CREATE);
      cb();
    });

    await userMongo.create(
      UserEntity.fromDTO({
        id: id,
        name: "ihsan",
        interests: ["driving"],
      }),
      WriteType.SOURCE
    );
  });

  it("Should update when not triggered by api", async (cb) => {
    const id = new ObjectId().toString();
    userMongo.addListener((e, o) => {
      console.log(e);
      expect(e.getPrimaryKey()).toEqual(id);
      expect(o).toEqual(Operation.CREATE);
      cb();
    });

    await client.collection("user").insertOne(
      UserMongo.fromDTO(
        {
          id: id,
          name: "ihsan",
          interests: ["driving"],
        },
        WriteType.SOURCE
      )
    );
  });
});

function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 15000);
  });
}
