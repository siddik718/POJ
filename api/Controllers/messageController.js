import MESSAGE from "../Models/messageModel.js";
// save a new message.
export const saveMessage = async(req,res) => {
    const {conversationId,sender,receiver,message} = req.body;
    try {
        const newMessage = new MESSAGE({
            conversationId,sender,receiver,message
        })
        const saveMessage = await newMessage.save();
        return res.status(200).json(saveMessage);
    }catch(err) {
        return res.status(500).json({
            message: 'Internal Error'
        });
    }
}
// get messagess.
export const findMessages = async(req,res)=>{
    const {conversationId} = req.params;
    try {
        const message = await MESSAGE.find({conversationId});
        return res.status(200).json(message);
    }catch(err) {
        return res.status(500).json({
            message: 'Internal Error'
        });
    }
}