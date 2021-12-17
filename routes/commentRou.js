const router=require('express').Router();
const {protect}=require('../middlewares/protect');
const {createComment,createReply,updateComment,likeUnlike,getAllComments,getAllReplies,deleteComment}=require('../controllers/commentCon');

//Create a comment
router.post('/comment/:postid',protect,createComment);

//Create a reply
router.post('/reply/:postid',protect,createReply);

//Update a comment
router.put('/updatecomment/:commentId',protect,updateComment);

//Like/unlike a comment
router.put('/comment/like',protect,likeUnlike);

//Get all comments
router.get('/getallcomment/:postId',protect,getAllComments);

//Get all replies
router.get('/getallreplies/:parentId',protect,getAllReplies);

//Delete comment
router.delete('/deletecomment/:commentId',protect,deleteComment);

module.exports=router;