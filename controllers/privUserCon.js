const User=require('../models/User');
const Post=require('../models/Post');

//Get a user
exports.getUser=async(req,res)=>{
    try {
        res.status(200).send(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get other users
exports.getOtherUser=async(req,res)=>{
    try {
        const {userid}=req.params;
        const user=await User.findOne({_id:userid}).populate("followers").populate("following");
        if(!user) res.status(400).json({error:"User doesn't exist!"});
        else res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

// Get all users
exports.getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({
            _id:{$ne:req.user._id}
        }).populate("followers").populate("following");
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get selected users
exports.getSelectedUser=async(req, res) => {
    try{
    let searchObj = req.body.field;
    if(searchObj  !== undefined) {
        searchObj = {
            _id:{$ne:req.user._id},
            $or: [
                { username: { $regex: req.body.field, $options: "i" }},
                { bio: { $regex: req.body.field, $options: "i" }}
            ]
        }
    }
    const searchedData =  await User.find(searchObj);
    res.status(200).send(searchedData);
  }
  catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
  };

//Profile updation
exports.updateProfile=async(req,res)=>{
    try {
        const {username,email,phone,bio,photo}=req.body;
        if(photo){
            await User.updateOne({_id:req.user._id},{
                $set:{username,email,phone,photo}
            })
        }
        if(bio && bio.trim()){
            await User.updateOne({_id:req.user._id},{
                $set:{bio}
            })
        }
        res.status(200).json({message:"Profile updation successful!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Follow/unfollow
exports.followUnfollow=async(req,res)=>{
    try {
        const {userid}=req.body;
        if(userid==req.user._id) res.status(400).json({error:"User can't follow himself!"});
        else{
            const user=await User.findOne({_id:userid});
            if(!user) res.status(400).json({error:"User doesn't exist!"});
            else{
                const isFollower=user.followers&&user.followers.includes(req.user._id);
                const option=isFollower?"$pull":"$addToSet";
                await User.updateOne({_id:req.user._id},{
                    [option]:{
                        following:userid
                    }
                })
                await User.updateOne({_id:user._id},{
                    [option]:{
                        followers:req.user._id
                    }
                })
                const msg=isFollower?"unfollowed":"followed";
                res.status(200).json({message:`User ${msg}!`});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Posts of a particular user
exports.postsOfAParticularUser=async(req,res)=>{
    try {
        const postedBy=req.params.userid;
        const posts=await Post.find({postedBy}).populate("categories").populate("postedBy").populate("likes");
        if(!posts || posts.length==0) res.status(400).json({error:"No post found!"});
        else res.status(200).send(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}