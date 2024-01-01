// Code Evaluation start from here.
import PROBLEMS from "../Models/problemModel.js";
import SUBMISSION from '../Models/submissionModel.js';

export const allSubmisson = async(req,res) => {
  try {
    const response = await SUBMISSION.find().sort({ createdAt: -1 });
    return res.status(200).json(response);
  }catch(err) {
    return res.status(500).json({
      message: 'Internal Error'
    });
  }
}

export const problemWise = async (req,res) => {
  const {problemID} = req.params;
  console.log(problemID);
  try {
    const submissions = await SUBMISSION.find({ problemID }).sort({ createdAt: -1 });
    if(!submissions) {
      return res.status(400).json({
        message: 'No Submission Found'
      })
    }
    return res.status(200).json(submissions);
  }catch(err) {
    return res.status(500).json({
      message: 'Internal Error'
    })
  }
}

export const userWise = async (req,res) => {
  const {username} = req.params;
  try {
    const submissions = await SUBMISSION.find({ username }).sort({ createdAt: -1 });
    if(!submissions) {
      return res.status(400).json({
        message: 'No Submission Found'
      })
    }
    return res.status(200).json(submissions);
  }catch(err) {
    return res.status(500).json({
      message: 'Internal Error'
    })
  }
}


import { createSubmission,getSubmission } from "../SubmissionHandler/Rapidapi.js";
export const test = async (req,res) => {
    const { language, source_code, username, id } = req.body;
    let langID = 54;
    if(language === "PYTHON3"){
      langID = 71
    }else if(language === "JAVA8") {
      langID = 62
    }
    try {
      const problem = await PROBLEMS.findById(id);
      if (!problem) {
        return res.status(400).json({
          message: "No problems Found",
        });
      }
      const input = problem.input;
      const expectedOutput = problem.output;
      const timeLimit = problem.timeLimit;
      const response = await createSubmission(source_code,input,langID,expectedOutput,timeLimit);

      setTimeout(async ()=>{
        const responseTwo = await getSubmission(response.token);
        // console.log(responseTwo);
        // store the result 
        const tot = await SUBMISSION.find();
        const submission = new SUBMISSION({
          username,
          submissionID:(tot.length + 1),
          problemID:id,
          title: problem.title,
          status:responseTwo.status.description,
          language: language,
          difficulty: problem.difficulty,
          sourceCode:source_code
        });
  
        await submission.save();
        // return result.
        return res.status(201).json({
          token: response.token,
          responseTwo: responseTwo.status
        });
      },2000);
    }catch(err) {
      return res.json(err)
    }
}







































        // export const evaluate = async (req, res) => {
        //   const { language, source_code, username, id } = req.body;
        //   try {
        //     const problem = await PROBLEMS.findById(id);
        //     if (!problem) {
        //       return res.status(400).json({
        //         message: "No problems Found",
        //       });
        //     }
        //     const data = {
        //       lang: language,
        //       source: source_code,
        //       input: problem.input,
        //       memory_limit: problem.memoryLimit,
        //       time_limit: problem.timeLimit,
        //       context: username,
        //     };
        //     const compileData = await compile(data,problem.output);
        
        //     // store them to SUBMISSION collection.
        //     if(compileData !== 'NA') {
        //       const tot = await SUBMISSION.find();
        //       const submission = new SUBMISSION({
        //       username,
        //       submissionID:(tot.length + 1),
        //       problemID:id,
        //       title: problem.title,
        //       status:compileData,
        //       language: language,
        //       difficulty: problem.difficulty,
        //       sourceCode:source_code
        //       });
        
        //       const response = await submission.save();
        //     }
        //     // send the result
        //     return res.status(200).json(compileData);
        //   } catch (err) {
        //     console.log(err);
        //     return res.status(500).json({
        //       message: "Internal Error",
        //     });
        //   }
        // };