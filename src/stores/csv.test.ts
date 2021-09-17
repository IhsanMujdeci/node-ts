import { UserCSVStore } from "@app/stores/csv";
import { UserEntity } from "@app/entity/user";
import { WriteType } from "@app/sync/broadcaster";

describe("CSV Store", () => {
  it("Should write many things in order to csv", () => {
    const csv = new UserCSVStore(__dirname + "/c.csv");
    csv.create(new UserEntity("1", "ihsan", ["golf"]), WriteType.SOURCE);
    csv.create(new UserEntity("2", "david", ["golf"]), WriteType.SOURCE);
    csv.update(new UserEntity("1", "lol", ["golf"]), WriteType.SOURCE);
    csv.create(new UserEntity("3", "hikma", ["golf"]), WriteType.SOURCE);
    csv.update(
      new UserEntity("2", "david", ["driving", "smoking gang wead"]),
      WriteType.SOURCE
    );

    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
  });
});
