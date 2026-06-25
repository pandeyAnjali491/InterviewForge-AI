import jwt from "jsonwebtoken";

const isAuth = async(req,res,next)=>{
    try {
        let {token} = req.cookies;

        if(!token || typeof token !== 'string'){
            return res.status(400).json({
                message:"No token found"
            })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifyToken){
            return res.status(400).json({
                message: "User not found"
            })
        }

        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        console.error("isAuth error:", error.message);
        return res.status(500).json({message: `isAuth error ${error.message}`});
    }
}

export default isAuth;