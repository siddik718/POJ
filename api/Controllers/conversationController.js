import CONVERSATION from "../Models/conversationModel.js";

// save a new conversation.
export const saveConversation = async (req, res) => {
  const { me, friend } = req.body;
  try {
    const response = await CONVERSATION.create({ me, friend });
    return res.status(201).json({
      message: "New Conversation Created",
      response,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

// Get a Conversation.
export const findConversation = async (req, res) => {
  const { me, friend } = req.query;
  // console.log("Me : ",me);
  // console.log("Friend : ",friend);
  try {
    const conversation = await CONVERSATION.find({
      $or: [
        { me: me, friend: friend },
        { me: friend, friend: me },
      ],
    });
    if (!conversation || conversation.length === 0) {
      return res.status(404).json({
        message: "No Conversation Found",
      });
    }
    return res.status(200).json(conversation);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};
