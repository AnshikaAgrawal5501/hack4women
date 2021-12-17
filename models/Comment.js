const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment',
        default:null
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
},
{timestamps:true})

const Comment=new mongoose.model("comment",commentSchema);

module.exports=Comment;