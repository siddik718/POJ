import CONTEST from "../Models/contestModel.js";
import dayjs from "dayjs";

export const addContest = async (req, res) => {
  // return res.status(200).json({message: 'Inside add contest'});
  try {
    const { title,startTime, endTime, problems } = req.body;
    const newContest = new CONTEST({
      title,
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

    const upcoming = await CONTEST.aggregate([
      {
        $match: {
          endTime: { $gte: new Date(currentDateUTC) },
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
          endTime: { $lt: new Date(currentDateUTC) },
        },
      },
      {
        $sort: {
          startTime: -1,
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

export const isAnyRunningNow = async(req,res) => {
  const now = dayjs().toISOString()
  try {
    // check if now >= startTime and now <= EndTime
    const upcoming = await CONTEST.aggregate([{
      $match: {
        startTime: { $lte: new Date(now) }, // Check if now is after or equal to startTime
        endTime: { $gte: new Date(now) },   // Check if now is before or equal to endTime
      }
    }]);
    const running = (upcoming && upcoming.length > 0);
    return res.status(200).json({
      upcoming,running});
  }catch(err) {
    return res.status(500).json(err);
  }
}