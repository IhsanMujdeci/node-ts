const fs = require("fs");

try{
    fs.readFileSync(".env");
} catch (e) {
    throw new Error(".env file not found in root directory.")
}

require('dotenv').config();