import { config } from "dotenv";
config();

const CODE_EVALUATION_URL = process.env.CODE_EVALUATION_URL;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const headers = {
  "content-type": "application/json",
  "client-secret": CLIENT_SECRET,
};

import axios from "axios";
export const compile = async (data, expectedOutput) => {
  // console.log("Inside compile "+ data);
  // console.log(data);
  try {
    // console.log(data);
    const response = await axios.post(CODE_EVALUATION_URL, data, { headers });
    // console.log(response.data);
    const update_url = response.data.status_update_url;
    const res = await checkStatus(update_url);
    console.log(res); // 
    // console.log(parseString(data.input));
    const result_status = res.result.run_status;
    const code_status = result_status.status;
    const userOutput = await getOutput(result_status.output);
    // console.log("Inside wvaluation \n" , userOutput,"\n", expectedOutput);
    if (code_status === "AC") {
      if (parseString(expectedOutput) === parseString(userOutput)) {
        return "AC";
      } else {
        return "WA";
      }
    } else {
      return code_status;
    }
  } catch (err) {
    // console.log(err.data);
    return err;
  }
};

const checkStatus = async (update_url) => {
  let res;
  do {
    res = await axios.get(update_url, { headers });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } while (res && res.data.result && res.data.result.compile_status === null);
  return res.data;
};

import fs from "fs";
import https from "https";
export const getOutput = async (remoteUrl) => {
  const file = fs.createWriteStream("data.txt");
  const downloadPromise = new Promise((resolve, reject) => {
    https.get(remoteUrl, (response) => {
      var stream = response.pipe(file);
      stream.on("finish", function () {
        resolve("data.txt");
      });
    });
  });
  return downloadPromise
    .then((filePath) => {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    })
    .then((value) => {
      return value;
    })
    .catch((err) => {
      return err;
    });
};

function parseString(value) {
  const input = value.trimEnd();
  const linesArray = input.split("\n");
  const processedOutput = linesArray.join("\n");
  return processedOutput;
}
