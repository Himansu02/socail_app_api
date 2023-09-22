const router = require("express").Router();
const Notification = require("../models/notification");

//get a user notifications
router.get("/:id", async (req, res) => {
  try {
    const notifications = await Notification.find({
      externalId: req.params.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//post notification
router.post("/", async (req, res) => {
  const newNotification = new Notification(req.body);
  try {
    const savedNotification = await newNotification.save();
    res.status(200).json(savedNotification);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete a notification
router.delete("/", async (req, res) => {
  try {
    console.log(req.body)
    const deletedData = await Notification.findOneAndDelete({
      externalId: req.body.externalId,
      senderId: req.body.senderId,
      type: req.body.type,
      postId:req.body.postId,
    });
    console.log(deletedData)
    res.status(200).json(deletedData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
