const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/createuser", userController.createuser);
router.post("/login", userController.login);
router.post("/getloggeduser", userController.getuserbytoken);
router.get("/getrootcomments", userController.getRootComments);
router.get("/getallcomments", userController.getAllComments);
router.post("/comment", userController.comment);
router.post("/reply", userController.reply);
router.post("/getComments", userController.getComments);
module.exports = router;
