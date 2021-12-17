const nodemailer=require('nodemailer');

const sendEmail=(contents)=>{
    let transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.MAIL_PASSWORD
        }
    })

    let details={
        from:process.env.EMAILID,
        to:contents.user,
        subject:contents.subject,
        html:contents.html
    }

    transporter.sendMail(details,function(err,res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res)
        }
    })
}

module.exports=sendEmail;