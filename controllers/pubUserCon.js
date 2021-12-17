const User=require('../models/User');
const sendEmail=require('../utils/sendEmail');
const {emailBody}=require('../utils/emailBody');

//Registration
exports.register=async(req,res)=>{
    try {
        const{username,email,phone,password}=req.body;
        if(!username.trim() || !email.trim() || !phone.trim() || !password.trim()){
            res.status(400).json({error:"Don't leave any field empty!"});
        }
        else{
            const user=new User({username,email,phone,password});
            await user.save();
            res.status(201).json({message:"User created!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
    }
}

//Login
exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) res.status(400).json({error:"Invalid credentials!"});
        else{
            const isSame=await user.comparePasswords(password);
            if(!isSame) res.status(400).json({error:"Invalid credentials!"});
            else{
                const token=await user.generateToken();
                res.status(200).send(token);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
    }
}


//Send email
exports.sendMail=async(req,res)=>{
    try {
        const {subject,username,email,message}=req.body;
        if(!subject.trim()||!username.trim()||!email.trim()||!message.trim()){
            res.status(400).json({error:"Please enter all the details!"});
        }
        else{
            await sendEmail({
                user:email,
                subject:`${subject}`,
                html:emailBody({username,message})
            })
            await sendEmail({
                user:process.env.EMAILID,
                subject:`${subject}`,
                html:emailBody({username,message})
            })
            res.status(200).json({message:"Mail sent!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}