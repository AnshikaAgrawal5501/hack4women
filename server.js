const express=require('express');
const app=express();
require('dotenv').config({path:'config.env'});
const bodyParser=require('body-parser');
const morgan=require('morgan');
const cors=require('cors');
const path=require('path');

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));

app.use(cors());
app.use(morgan("dev"));

require('./db/conn');

const port=process.env.PORT || 5000;

app.use('/api/user',require('./routes/pubUserRou'));
app.use('/api/user',require('./routes/privUserRou'));
app.use('/api/category',require('./routes/categoryRou'));
app.use('/api/posts',require('./routes/postRou'));
app.use('/api/posts',require('./routes/commentRou'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "client/build", "index.html"));
      });
}

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})