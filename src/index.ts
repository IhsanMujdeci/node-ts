import * as rest from "@app/servid/rest";
import { makeMongoDB } from "@app/stores/mongodb";

(async function main() {
  const port = parseInt(process.env.PORT ?? "");
  if (isNaN(port)) {
    throw new Error("Port supplied is nan");
  }
  const mongoUri = process.env.MONGO_URI ?? "";
  const mongoDbName = process.env.MONGO_DB_NAME ?? "";
  const mongoClient = await makeMongoDB(mongoUri, mongoDbName);
  await rest.startServer(port, mongoClient);
})();
