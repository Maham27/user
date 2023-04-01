const express = require("express");
const router = express.Router();
const user = require("../models/usermodels");
const lawyer = require("../models/lawyersmodel");
const authmidleware = require("../midleware/authenticationmiddleware");

router.get("/getalllawyers", authmidleware, async (req, res) => {
  try {
    const lawyers = await lawyer.find({});
    res
      .status(200)
      .send({
        message: "Lawyers fetched successfully",
        success: true,
        data: lawyers,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error in fetching lawyers", success: false, error });
  }
});
router.get("/getallusers", authmidleware, async (req, res) => {
  try {
    const users = await user.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error in fetching users", success: false, error });
  }
});
router.post("/changelawyerstatus", authmidleware, async (req, res) => {
  try {
    const { lawyerId, status } = req.body;
    const lawyers = await lawyer.findByIdAndUpdate(lawyerId, { status });

    const userregistered = await user.findOne({ _id: lawyers.userId });
    const unseennotifications = userregistered.unseennotifications;

    unseennotifications.push({
      type: "newlawyerrequestchanged",
      message: `your lawyer has been ${status}`,
      onClickPath: "/notifications",
    });
    userregistered.islawyer = status === "approved" ? true : false;
    await userregistered.save();

    res.status(200).send({
      message: "lawyer status has been updated",
      succes: true,
      data: lawyers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", success: false, error });
  }
});
module.exports = router;
