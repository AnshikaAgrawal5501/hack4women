import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './update.css';

const Update = () => {

  const navigate=useNavigate();

  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [bio,setBio]=useState("");
  const [photo,setPhoto]=useState("");

  useEffect(()=>{
    if(!localStorage.getItem("fmToken")) navigate('/login');
    else{
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("fmToken")}`
        }
      }
      axios.get('/api/user/getuser',config).then((res)=>{
        console.log(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setBio(res.data.bio?res.data.bio:"");
        setPhoto(res.data.photo);
      }).catch((error)=>{
        console.log(error);
      })
    }
  },[])


  const uploadImage=async(e)=>{
    const file=e.target.files[0];
    const base64=await convertBase64(file);
    setPhoto(base64.toString());
  }
  
  const convertBase64=(file)=>{
    return new Promise((resolve,reject)=>{
      const fileReader=new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload=()=>{
        resolve(fileReader.result);
      }
      
      fileReader.onerror=(err)=>{
        reject(err);
      }
    })
  }

  const updateData=async(e)=>{
    e.preventDefault();
    try {
      if(!username.trim()||!email.trim()||!phone.trim()||!bio.trim()) alert("Don't leave any field empty!");
      else{
        const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("fmToken")}`
          }
        }
        await axios.put('/api/user/updateprofile',{username,email,phone,bio,photo},config);
        alert("Updation successful!");
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

    return (
        <div className='update-page' style={{backgroundColor: '#5e4666',
            backgroundImage: `url("https://www.transparenttextures.com/patterns/light-wool.png")`}}>
              <div>
            <section class="vh-100">
  <div class="container py-5 h-100">
              {/* <h1 className='heading' style={{color:'#FF577F'}}>Pregnancy Journal Space</h1> */}
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6 text-center" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <img src={photo} class="img-fluid" alt="Phone image" style={{width:"50%"}}/>
        {/* <button type="submit" class="btn btn-primary btn-lg btn-block" style={{marginBottom:20, marginTop:20}}>Upload Image</button> */}
        <input type="file" className="btn btn-primary btn-md" style={{marginBottom:20, marginTop:20,width:"50%"}} onChange={(e)=>{uploadImage(e)}}/>
        {/* <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded mt-5" src={nImg}  style={{width:"80%"}}/><span className="font-weight-bold">Upload image</span></div> */}
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1" style={{zIndex:"1000"}}>
        <form onSubmit={updateData}>
        <div class="md-form mb-3">
            <input style={{height:10}} type="text" id="form1Example13" class="form-control form-control-lg" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Name"/>
          </div>

          <div class="md-form mb-3">
            <input style={{height:10}} type="email" id="form1Example13" class="form-control form-control-lg" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email Address"/>
          </div>

          <div class="md-form mb-3">
            <input style={{height:10}} type="phone" id="form1Example13" class="form-control form-control-lg" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone"/>
          </div>

          <div class="md-form mb-3">
            <input style={{height:10}} type="text" id="form1Example13" class="form-control form-control-lg" value={bio} onChange={(e)=>setBio(e.target.value)} placeholder="Bio"/>
          </div>

          <button type="submit" class="btn btn-primary btn-lg btn-block">Update Profile</button>
        </form>
      </div>
    </div>
  </div>
</section>
              </div>
        </div>
)
}

export default Update;