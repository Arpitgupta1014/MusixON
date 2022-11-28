const {register,googlelogin,login,recentlyPlayedSongs,giveRecentSongs,addToLikedSong,removeFromLiked,giveLikedSong,resetPassword} = require("../Controllers/AuthControllers");
const {checkUser} = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();

router.post("/",checkUser);
router.post("/register",register);
router.post("/googlelogin",googlelogin);
router.post("/login",login);
router.post("/recentlyPlayedSongs",recentlyPlayedSongs);
router.post("/giveRecentSongs",giveRecentSongs);
router.post("/addToLikedSong",addToLikedSong);
router.post("/removeFromLiked",removeFromLiked);
router.post("/giveLikedSong",giveLikedSong);
router.post("/resetPassword",resetPassword);

module.exports = router;
