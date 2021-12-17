const Comment=require('../models/Comment');

//Create a comment
exports.createComment=async(req,res)=>{
    try {
        const {body}=req.body;
        if(!body || !body.trim()){
            res.status(400).json({error:"Please enter something to the body!"});
        }
        else{
            const commentedBy=req.user._id;
            const post=req.params.postid;
            const comment=new Comment({post,body,commentedBy});
            await comment.save();
            res.status(201).json({message:"Comment created!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Create a reply
exports.createReply=async(req,res)=>{
    try {
        const {body,parentId}=req.body;
        if(!body || !body.trim() || !parentId || !parentId.trim()){
            res.status(400).json({error:"Don't leave any field empty!"});
        }
        else{
            const commentedBy=req.user._id;
            const post=req.params.postid;
            const comment=new Comment({post,body,commentedBy,parentId});
            await comment.save();
            res.status(201).json({message:"Reply created!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Update a comment
exports.updateComment=async(req,res)=>{
    try {
        const {body}=req.body;
        const commentId=req.params.commentId;
        if(!body || !body.trim()){
            res.status(400).json({error:"Please enter something to the body!"});
        }
        else{
            const comment=await Comment.findOne({_id:commentId});
            if(comment.commentedBy.toString().trim()==req.user._id.toString().trim()) {
                await Comment.updateOne({_id:commentId},{
                    $set:{body}
                })
                res.status(200).json({message:"Comment updated!"});
            }
            else res.status(400).json({error:"Only admin can edit comment!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Like/unlike a comment
exports.likeUnlike=async(req,res)=>{
    try {
        const _id=req.body.commentId;
        const comment=await Comment.findOne({_id});
        if(!comment){
            res.status(400).json({error:"Comment not found!"});
        }
        else{
            const liked=comment.likes.includes(req.user._id);
            const option=liked?"$pull":"$addToSet";
            await Comment.updateOne({_id},{
                [option]:{
                    likes:req.user._id
                }
            })
            const msg=liked?"unliked":"liked";
            res.status(200).json({message:`Comment ${msg}!`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get all comments
exports.getAllComments=async(req,res)=>{
    try {
        const post=req.params.postId;
        const comments=await Comment.find({
            $and:[{post}]
        }).populate("post").populate("commentedBy").populate("likes");
        res.status(200).send(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Get all replies
exports.getAllReplies=async(req,res)=>{
    try {
        const parentId=req.params.parentId;
        const comments=await Comment.find({parentId}).populate("post").populate("commentedBy").populate("parentId").populate("likes");
        res.status(200).send(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Delete comment
exports.deleteComment=async(req,res)=>{
    try {
        const _id=req.params.commentId;
        const comment=await Comment.findOne({_id});
        if(!comment) res.status(400).json({error:"Comment not found!"});
        else{
            const isParent=comment.parentId==null?true:false;
            if(isParent){
                await Comment.deleteMany({parentId:_id});
            }
            await Comment.deleteOne({_id});
            res.status(200).json({message:"Comment deleted!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}