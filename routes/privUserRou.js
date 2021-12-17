const router=require('express').Router();
const {protect}=require('../middlewares/protect');
const {getUser,getOtherUser,updateProfile,followUnfollow,postsOfAParticularUser,getAllUsers,getSelectedUser}=require('../controllers/privUserCon');

//Get a user
router.get('/getuser',protect,getUser);

//Get other users
router.get('/getotheruser/:userid',protect,getOtherUser);

//Get all users
router.get('/getallusers',protect,getAllUsers);

//Get selected users
router.post('/getselecteduser',protect,getSelectedUser);

//Profile updation
router.put('/updateprofile',protect,updateProfile);

//Follow/unfollow
router.post('/followunfollow',protect,followUnfollow);

//Posts of a particular user
router.get('/posts/:userid',protect,postsOfAParticularUser);

module.exports=router;