import * as express from "express";
import { UserInMemoryStore } from "@app/stores/inMemory";
import { Operation, WriteType } from "@app/sync/broadcaster";
import { UserEntity, UserEntityDTO } from "@app/entity/user";
import * as Mongo from "mongodb";
import { UserMongo } from "@app/stores/mongodb";

export function startServer(
  port: number,
  mongoClient: Mongo.Db
): Promise<express.Application> {
  const app = express();
  app.use(express.json());

  const inMemoryStore = new UserInMemoryStore();
  const userMongo = new UserMongo(mongoClient);

  inMemoryStore.addListener(async function (user, operation) {
    if (operation === Operation.CREATE) {
      await userMongo.create(user, WriteType.SINK);
    }
    if (operation === Operation.UPDATE) {
      await userMongo.update(user, WriteType.SINK);
    }
  });

  userMongo.addListener(async function (user, operation) {
    if (operation === Operation.CREATE) {
      await inMemoryStore.create(user, WriteType.SINK);
    }
    if (operation === Operation.UPDATE) {
      await inMemoryStore.update(user, WriteType.SINK);
    }
  });

  app.post<unknown, unknown, Omit<UserEntityDTO, "id">>(
    "/",
    async (req, res, next) => {
      await inMemoryStore.create(
        UserEntity.fromDTO({
          id: new Mongo.ObjectId().toString(),
          ...req.body,
        }),
        WriteType.SOURCE
      );
      res.status(201).send();
    }
  );

  app.put<{ id: string }, unknown, UserEntityDTO>(
    "/:id",
    async (req, res, next) => {
      try {
        await inMemoryStore.update(
          UserEntity.fromDTO(req.body),
          WriteType.SOURCE
        );
        res.status(200).send();
      } catch (e) {
        if (e.message === "not found") {
          return res.status(404).send();
        }
        res.status(500).send(e);
      }
    }
  );

  return new Promise((resolve, reject) => {
    app.on;
    app
      .listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
        resolve(app);
      })
      .on("error", reject);
  });
}
