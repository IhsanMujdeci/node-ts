import { add } from "@myApp/index";

describe("Index test", () => {
  it("Should be able to add 1 and 1", () => {
    expect(add(1, 1)).toEqual(2);
  });

  it("Should load environment variable", () => {
    expect(process.env.HELLO).toEqual("testing");
  });
});
