import STANDING from "../Models/standingModel.js";
import CONTEST from '../Models/contestModel.js';
import dayjs from 'dayjs';

const duration = (currentTime,contestStartTime)=> {
  return dayjs(currentTime).diff(dayjs(contestStartTime),'second');
}

export const save = async (req, res) => {
  console.log(req.body)
  const { username, score, contestID } = req.body;
  try {
    // find the contest startTime.
    const contest = await CONTEST.findById(contestID);
    console.log('Contest : ',contest)
    const contestStartTime = contest.startTime;
    const currentTime = dayjs().format();
    console.log("currentTime : ",currentTime);
    console.log('Contest StartTime : ',contestStartTime)
    console.log('Duration : ', duration(currentTime,contestStartTime))
    // find if user exist.
    const userExist = await STANDING.findOne({ contestID,username });
    if (userExist) {
      const updatedScore = userExist.score + score * duration(currentTime,contestStartTime) ; 
      const updatedUser = await STANDING.findOneAndUpdate(
        { username },
        { $set: { score: updatedScore, contestID } },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    }else {
      const submit = await STANDING.create({ username, score:(score * duration(currentTime,contestStartTime)), contestID });
      return res.status(201).json(submit);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};
export const stand = async (req, res) => {
  const { contestID } = req.query;
  try {
    const r = await STANDING.find({ contestID: contestID }).sort({ score: 1, updatedAt: 1  });
    return res.status(200).json(r);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};
