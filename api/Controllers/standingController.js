import STANDING from "../Models/standingModel.js";

export const save = async (req, res) => {
  const { username, score, contestID } = req.body;
  console.log(req.body);
  try {
    // find if user exist.
    const userExist = await STANDING.findOne({username});
    console.log('USER EXIST : ', userExist);
    if(userExist && userExist.length > 0) {
      score = userExist.score + score;
    }
    console.log('USER EXIST : ', userExist);
    const submit = await STANDING.create({ username, score, contestID });
    console.log('Submit : ', submit);
    return res.status(201).json(submit);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};
export const stand = async (req, res) => {
  console.log("Staning : ");
  const {contestID} = req.query;
  try {
    const r = await STANDING.find({contestID : contestID}).sort({score: -1});
    return res.status(200).json(r);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};
