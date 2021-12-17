const router=require('express')();
const {protect}=require('../middlewares/protect');
const {createPost,getPost,updatePost,deletePost,likeUnlike,getAllPosts,getRelatedPosts,followingPosts}=require('../controllers/postCon');

//Create post
router.post('/create',protect,createPost);

//Get a post
router.get('/:postid',protect,getPost);

//Update a post
router.put('/:postid',protect,updatePost);

//Get all posts according to categories
router.post('/allwithcategories',protect,getAllPosts);

//Get all related posts
router.get('/related/:postid',protect,getRelatedPosts);

//Delete a post
router.delete('/delete/:postid',protect,deletePost);

//Like/unlike
router.post('/like',protect,likeUnlike);

//Posts of the people user follows
router.post('/followingposts',protect,followingPosts);

module.exports=router;