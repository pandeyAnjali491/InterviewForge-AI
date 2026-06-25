import User from "../models/user.model.js";
import genToken from "../config/token.js";

export const googleAuth = async(req,res)=>{
    try{
        const {name,email} = req.body;
        let user = await User.findOne({email});
        if(!user){
            user = await User.create({
                name,
                email,
            });
        }
        const token = genToken(user._id);
        res.cookie("token", token, {
            maxAge: 7*24*60*60*1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });
        return res.status(200).json(user);
    }
    catch(e){
        return res.status(500).json({message: `Google Authentication Failed ${e}`});
    }
}

export const logout = async(req,res)=>{
    try{
        await res.clearCookie("token");
        return res.status(200).json({message: "Logged out successfully"});
    }
    catch(e){
        return res.status(500).json({message: `Logout Failed ${e}`});
    }
}