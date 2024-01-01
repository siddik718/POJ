import PROBLEMS from "../Models/problemModel.js";

export const allProblem = async (req, res) => {
  try {
    const problems = await PROBLEMS.find().sort({ createdAt: -1 });
    return res.status(200).json(problems);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

export const oneProblem = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await PROBLEMS.findById(id);
    if (!problem) {
      return res.status(400).json({
        message: "No Problem Found",
      });
    }
    return res.status(200).json(problem);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};
export const addProblem = async (req, res) => {
  const {
    username,
    title,
    statement,
    sampleInput,
    sampleOutput,
    input,
    output,
    timeLimit,
    memoryLimit,
    selectedTags,
    difficulty,
  } = req.body;
  console.log("Username " + username); // 0
  console.log("Title" + title); // 1
  console.log("statement" + statement); // 2
  console.log("sampleInput" + sampleInput); // 3
  console.log("sampleOutput" + sampleOutput); // 4
  console.log("input" + input); // 5
  console.log("output" + output); // 6
  console.log("timeLimit" + timeLimit); // 7
  console.log("memoryLimit" + memoryLimit); // 8
  console.log("tags" + selectedTags); // 9
  console.log("difficulty" + difficulty); // 10
  try {
    // check if same title problem exist.
    const alreadyHave = await PROBLEMS.findOne({ title });
    if (alreadyHave) {
      return res.status(400).json({
        message: "Problem Already Exist.",
      });
    }
    const memoryLimitMbToKb = Math.min(262144, memoryLimit * 1024);
    // save the problem to db
    const newProblem = new PROBLEMS({
      username,
      title,
      statement,
      sampleInput,
      sampleOutput,
      input,
      output,
      timeLimit,
      memoryLimit: memoryLimitMbToKb,
      selectedTags,
      difficulty,
    });
    const response = await newProblem.save();
    return res.status(201).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Error");
  }
};

export const getByName = async(req,res) => {
  const {title} = req.query;
  try {
      const problem = await PROBLEMS.findOne({ title });
      return res.status(200).json(problem);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Error',
    })
  }
}