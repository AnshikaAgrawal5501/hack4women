import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from './quill';
import './upload.css';

import ImageUploading from 'react-images-uploading';

import Checkbox from '@mui/material/Checkbox';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const useStyle = makeStyles(theme => ({
  marg: {
    paddingTop: 80,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 140,
    backgroundColor: '#E4D8DC',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/arches.png")',
  },
  script:{
    display:'flex',
    [theme.breakpoints.down('950')]:{
      display:'block', 
     }
  },
  map:{
    [theme.breakpoints.between('1400','2000')]:{
    marginRight:100,
    },
    [theme.breakpoints.between('900','1400')]:{
      marginRight:0,
    },
    [theme.breakpoints.down('950')]:{
      marginTop:20, 
     }
  },
  field:{
    width: '70ch',
    [theme.breakpoints.between('1100','1200')]:{
      width: '60ch',
    },
    [theme.breakpoints.between('1025','1100')]:{
      width: '55ch',
    },
    [theme.breakpoints.between('950','1025')]:{
      width: '40ch',
    },
    [theme.breakpoints.between('780','950')]:{
      width: '78ch',
    },
    [theme.breakpoints.between('690','780')]:{
      width: '68ch',
    },
    [theme.breakpoints.between('600','690')]:{
      width: '56ch',
    },
    [theme.breakpoints.between('480','600')]:{
      width: '45ch',
    },
    [theme.breakpoints.between('420','480')]:{
      width: '33ch',
    },
    [theme.breakpoints.between('200','420')]:{
      width: '30ch',
    },
  },
  img:{
    width:440,
    [theme.breakpoints.between('480','600')]:{
      width:400,
    },
    [theme.breakpoints.between('420','480')]:{
      width:350,
    },
    [theme.breakpoints.between('200','420')]:{
      width:300,
    },
  }
}));

const Upload = () => {

  const navigate=useNavigate();

  const {id}=useParams();

  const classes = useStyle();

  const [text, setText] = useState('');

  const [images, setImages] = React.useState([]);

  const [title,setTitle]=useState("");
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };


  const [state, setState] = React.useState({
    diet: false,
    physical: false,
    mental: false,
    maternity: false,
    hygienic: false,
    other: false,
  });

  useEffect(()=>{
    if(!localStorage.getItem("fmToken")){
      navigate("/login");
    }
    if(id){
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("fmToken")}`
        }
      }
      axios.get(`/api/posts/${id}`,config).then(({data})=>{
        console.log(data);
        setTitle(data.title);
        setText(data.body);
        // setImages(data.photo);
        let ft=false,ph=false,men=false,mat=false,hy=false,oth=false;
        for(let i=0;i<data.categories.length;i++){
          let e=data.categories[i];
          if(e._id==="61b0603d073dc071c7731f29") ft=true;
          if(e._id==="61b06052073dc071c7731f2b") ph=true;
          if(e._id==="61b06060073dc071c7731f2d") men=true;
          if(e._id==="61b06071073dc071c7731f2f") mat=true;
          if(e._id==="61b06083073dc071c7731f31") hy=true;
          if(e._id==="61b5f4146938c4162cb2d2f2") oth=true;
        }
        setState({
          diet: ft,
        physical: ph,
        mental: men,
        maternity: mat,
        hygienic: hy,
        other: oth
        })
        console.log(data.categories)
      }).catch((error)=>console.log(error));
    }
  },[])

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { diet, physical,mental, maternity,hygienic,other } = state;
  const error = [diet, physical,mental, maternity,hygienic,other].filter((v) => v).length < 1;

  const postData=async()=>{
    try {
      const body=text;
      const categories=[];
      if(state.diet) categories.push("61b0603d073dc071c7731f29");
      if(state.physical) categories.push("61b06052073dc071c7731f2b");
      if(state.mental) categories.push("61b06060073dc071c7731f2d");
      if(state.maternity) categories.push("61b06071073dc071c7731f2f");
      if(state.hygienic) categories.push("61b06083073dc071c7731f31");
      if(state.other) categories.push("61b5f4146938c4162cb2d2f2");
      const photo=images.length>0?images[0].data_url:null;

      if(!body.trim()||!title.trim()||categories.length==0) alert("Don't leave any field empty!");
      else{
        const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("fmToken")}`
          }
        }
        if(!id){
          await axios.post(`/api/posts/create`,{title,body,photo,categories},config);
          alert("Post created!");
        }
        else{
          await axios.put(`/api/posts/${id}`,{title,body,photo,categories},config);
          alert("Post updated!");
        }
        navigate('/posts');
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

//   function getPlainText( strSrc ) {
//     var resultStr = "";

//     // Ignore the <p> tag if it is in very start of the text
//     if(strSrc.indexOf('<p>') == 0)
//         resultStr = strSrc.substring(3);
//     else
//         resultStr = strSrc;

//     // Replace <p> with two newlines
//     resultStr = resultStr.replace(/<p>/gi, "\r\n\r\n");
//     // Replace <br /> with one newline
//     resultStr = resultStr.replace(/<br \/>/gi, "\r\n");
//     resultStr = resultStr.replace(/<br>/gi, "\r\n");
//     resultStr = resultStr.replace(/&nbsp;/gi, " ");

//     //-+-+-+-+-+-+-+-+-+-+-+
//     // Strip off other HTML tags.
//     //-+-+-+-+-+-+-+-+-+-+-+

//     return  resultStr.replace( /<[^<|>]+?>/gi,'' );
// }

  return (
    <div className={classes.marg}>
      <h1 className='heading' style={{color:'#FF5403'}}>{!id?"Create a Post":"Update a Post"}</h1>
      <div className={classes.script}>
        <div>
          <h3 style={{color:'#9D84B7'}}>Post Title</h3>
          <FormControl sx={{ m: 1 }} variant="filled" className={classes.field}>
            <InputLabel htmlFor="Title">Title</InputLabel>
            <FilledInput
              id="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </FormControl>

          <h3 style={{color:'#9D84B7'}}>Post Description</h3>
          <div className="CKedit">
            <div className="editor">
              <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={text}
                        placeholder="Write something amazing..."
                        onChange={(e)=>{
                          setText(e)
                        }}
                    />
            </div>
          </div>
        </div>

        <div className={classes.map}>
          <div>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  <button className="btn1_upload"
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </button>
                  &nbsp;
                  <button className="btn2_upload" onClick={onImageRemoveAll}>Remove all images</button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image['data_url']} alt="" className={classes.img} />
                      <div className="image-item__btn-wrapper">
                        <button className="btn3_upload" onClick={() => onImageUpdate(index)}>Update</button>
                        <button className="btn4_upload" onClick={() => onImageRemove(index)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>

            <FormControl
              required
              error={error}
              component="fieldset"
              sx={{ m: 3 }}
              variant="standard"
            >
              <FormLabel component="legend">Choose tags for the post</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={diet} onChange={handleChange} name="diet" />
                  }
                  label="Diet plans"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={physical} onChange={handleChange} name="physical" />
                  }
                  label="Physical therapy/Workouts"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={mental} onChange={handleChange} name="mental" />
                  }
                  label="Mental therapy"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={maternity} onChange={handleChange} name="maternity" />
                  }
                  label="Maternity wardrobe"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={hygienic} onChange={handleChange} name="hygienic" />
                  }
                  label="Hygienic practices"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={other} onChange={handleChange} name="other" />
                  }
                  label="Other"
                />
              </FormGroup>
              <FormHelperText>Pick atleast one</FormHelperText>
            </FormControl>

          </div>
          <button className="btn5_upload" onClick={postData} >{id?"Update":"Create"}</button>
        </div>
      </div>
    </div>
  )
}

export default Upload;