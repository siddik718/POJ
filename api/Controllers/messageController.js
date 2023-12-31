import MESSAGE from "../Models/messageModel.js";
// save a new message.
export const sendMessage = async(req,res) => {
    const {sender,receiver,message} = req.body;
    try {
        const newMessage = new MESSAGE({
            sender,receiver,message
        })
        const sendMessage = await newMessage.save();
        return res.status(201).json(sendMessage);
    }catch(err) {
        return res.status(500).json({
            message: 'Internal Error'
        });
    }
}
// get messagess.
export const findMessages = async(req,res)=>{
    const { sender, receiver } = req.query;
    try {
        const messages = await MESSAGE.find({
            $or: [
              { sender: sender, receiver: receiver },
              { sender: receiver, receiver: sender },
            ],
          });
          return res.status(200).json(messages);
    }catch(err) {
        return res.status(500).json({
            message: 'Internal Error'
        });
    }
}