require("dotenv/config");
const fs = require("fs");

try {
  fs.readFileSync(process.env.DOTENV_CONFIG_PATH);
} catch (e) {
  throw new Error(
    process.env.DOTENV_CONFIG_PATH + " file not found in root directory."
  );
}
