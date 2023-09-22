const router = require("express").Router();
const Comment = require("../models/comment");
const Notification = require("../models/notification")

//get a post comment
router.get('/:id',async(req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.id}).sort({createdAt:-1})
        return res.status(200).json(comments)
    }catch(err){
        res.status(500).json(err)
    }
})

//post a comment
router.post('/',async(req,res)=>{
    const newComment=new Comment(req.body)
    try{
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)
    }catch(err){
        res.status(500).json(err)
    }
})

//update commet like
router.put("/:id/like", async (req, res) => {
    try {
      const updatedData = await Comment.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.body.userId },
      });
      const newNotification = new Notification({
        senderId: req.body.userId,
        externalId: req.body.receverId,
        postId:req.body.postId,
        type:3,
        commentId:req.params.id
      });
      const savedNotification = await newNotification.save();
      console.log(savedNotification)
      res.status(200).json(updatedData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //put a post unLike
router.put("/:id/unlike", async (req, res) => {
    try {
      const updatedData = await Comment.findByIdAndUpdate(req.params.id, {
        $pull: { likes: req.body.userId },
      });
      const query={
        externalId:req.body.receverId,
        senderId:req.body.userId,
        postId:req.body.postId,
        type:3,
        commentId:req.params.id
      }
      const deleteNotification=await Notification.findOneAndDelete(query)
      console.log(deleteNotification)
      res.status(200).json(updatedData)
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;