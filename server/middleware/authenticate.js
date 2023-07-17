const jwt = require('jsonwebtoken');
const Users = require('../models/userSchema');
const secretKey = process.env.KEY;

const authenticate = async(req,res,next)=>{
    try {

        const getCookie = req.cookies.Amazonweb;

        const verifyToken = jwt.verify(getCookie,secretKey);  //will generate an id that will be required to authenticate user
        // console.log(verifyToken);

        const rootUser = await Users.findOne({_id:verifyToken._id,"tokens.token":getCookie});
        // console.log(rootUser);

        if(!rootUser) {throw new Error("User not found")};

        req.token = getCookie;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();


    } catch (error) {
        res.status(401).json("Unauthorized User");
        console.log(error);
    }
}

module.exports = authenticate;