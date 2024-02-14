import fs from "fs";
import configOptions from "./configOptions.js";

fs.writeFile(
  "configOptions.json",
  JSON.stringify(configOptions, null, 2),
  (err) => {
    if (err) throw err;
    console.log("Data written to file");
  }
);
