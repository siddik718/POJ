import CONTEST from "../Models/contestModel.js";
import dayjs from "dayjs";

export const addProblem = async (req, res) => {
  try {
    const { startTime, endTime, problems } = req.body;
    const newContest = new CONTEST({
      startTime,
      endTime,
      problems,
    });
    const savedContest = await newContest.save();
    return res.status(201).json({
      message: "All Ok",
      savedContest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

export const getALL = async (req, res) => {
  try {
    const currentDateUTC = dayjs().toISOString();
    const allContest = await CONTEST.find().sort({startTime: 1});

    // console.log(allContest[0].startTime);
    // console.log(currentDateUTC);

    const upcoming = await CONTEST.aggregate([
      {
        $match: {
          startTime: { $gte: new Date(currentDateUTC) },
        },
      },
      {
        $sort: {
          startTime: 1,
        },
      },
    ]);
    const past = await CONTEST.aggregate([
      {
        $match: {
          startTime: { $lt: new Date(currentDateUTC) },
        },
      },
      {
        $sort: {
          startTime: 1,
        },
      },
    ]);

    return res.status(200).json({
      message: "ALL Ok",
      upcoming,
      past,
      allContest,
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

export const getOne = async(req,res) => {
  const { id } = req.params;
  try {
    const contest = await CONTEST.findById(id);
    return res.status(200).json({contest});
  }catch(error) {
    return res.status(500).json({
      message: 'Internal Error'
    })
  }
}