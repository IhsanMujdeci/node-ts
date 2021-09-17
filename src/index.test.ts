import * as diff from "diff";
import TextFileDiff from "text-file-diff";

describe("Index test", () => {
  it("Should be able to add 1 and 1", () => {
    console.log(process.env.MONGO_DB_NAME);
    console.log(process.env.DOTENV_CONFIG_PATH);
    // const a = "1,2,3\n4,5,6";
    // const b = "1,2,3\n4,5,6\n7,8,9\n10,11,12";
    //
    // console.log(diff.diffLines(a, b, { newlineIsToken: false }));
    // // if new line is detected then add that new line
    // if line is diff than other than
  });
});

// write to in mem, then write to mongo, mongo will reac
