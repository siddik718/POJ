import STANDING from "../Models/standingModel.js";

export const save = async (req, res) => {
  const { username, score, contestID } = req.body;
  try {
    // find if user exist.
    const userExist = await STANDING.findOne({ contestID,username });
    if (userExist) {
      const updatedScore = userExist.score + score;
      const updatedUser = await STANDING.findOneAndUpdate(
        { username },
        { $set: { score: updatedScore, contestID } },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    }else {
      const submit = await STANDING.create({ username, score, contestID });
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
    const r = await STANDING.find({ contestID: contestID }).sort({ score: -1, updatedAt: 1  });
    return res.status(200).json(r);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};
