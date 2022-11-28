const Guest = require("../Models/GuestModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"this super secret key",async(err,decodedToken)=>{
            if(err){
                res.json({status:false});
                next();
            }
            else{
                const guest = await Guest.findById(decodedToken.id);
                if(guest){
                    var temp = {
                        _id:guest._id,
                        name:guest.name,
                        email:guest.email,
                        recentlyPlayedSong:guest.recentlyPlayedSong,
                    }
                    res.json({status:true ,guest: temp});
                } 
                else res.json({status:false});
                next();
            }
        })
    }
    else{
        res.json({status:false});
        next();
    }
}