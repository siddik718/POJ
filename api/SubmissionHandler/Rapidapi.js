import axios from "axios";
import base64 from 'base-64';
// (source, input, langID, expectedOutput, timeLimit, memoryLimit)
export const createSubmission = async ( source,input,langID,expectedOutput,timeLimit) => {
  const baseSource = base64.encode(source);
  const baseInput = base64.encode(input);
  const baseExpectedOutput = base64.encode(expectedOutput);

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      fields: "*",
    },
  
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "8789e99558msh4b0f656e0c57d26p1ad6d8jsnd37dcc066655",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: langID,
      source_code: baseSource,
      stdin: baseInput,
      expected_output: baseExpectedOutput,
      cpu_time_limit: timeLimit,
    },
  };
  // memory_limit: memorylimit,
  
  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSubmission = async (token) => {
  console.log(token);
  const options = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": "8789e99558msh4b0f656e0c57d26p1ad6d8jsnd37dcc066655",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
