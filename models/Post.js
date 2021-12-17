const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    body:{
        type:String,
        required:true,
        minlength:10,
        maxlength:1000000
    },
    excerpt:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgOinP1I4DJR8UXKbif9pXj4UTa1dar-CfGBr4mmSXNfOySMXxPfwa023_n0gvkdK4mig&usqp=CAU"
    },
    categories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    }],
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
},
{timestamps:true})

const Post=new mongoose.model("post",postSchema);

module.exports=Post;