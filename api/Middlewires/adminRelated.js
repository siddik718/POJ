import USER from "../Models/userModel.js";

export const isAdmin = async(req,res,next) => {
    const { id } = req.body;
    console.log(req.body);
    try {
        // find if the user is admin...
        const userExist = await USER.findById(id);
        console.log(userExist);
        if(userExist && userExist.admin === true) {
            next();
            console.log(userExist);
        }else {
            return res.status(401).json({message: 'You are not Autherized'});
        }
    }catch(err) {
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}