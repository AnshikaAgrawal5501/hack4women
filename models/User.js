const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email !");
            }
        }
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    photo:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },
    bio:{
        type:String,
        maxlength:1000
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minlength:8
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]

},
{timestamps:true});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,10);
    }
    next();
})

userSchema.methods.generateToken=async function(){
    try {
        const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:process.env.EXPIRES});
        return token;
    } catch (error) {
        throw new Error("Token is not generated!");
    }
}

userSchema.methods.comparePasswords=async function(password){
    try {
        return await bcryptjs.compare(password,this.password);
    } catch (error) {
        return false;
    }
}

const User=new mongoose.model("user",userSchema);

module.exports=User;