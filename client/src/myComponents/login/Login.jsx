import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

const Login = ({open,setOpen , setAccount}) => {

  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const postData=async(e)=>{
    try {
      e.preventDefault();
      if(!email.trim()||!password.trim()) alert("Don't leave any field empty!");
      else{
        const config={
          headers:{
            "Content-Type":"application/json"
          }
        }
        const {data}=await axios.post('/api/user/login',{email,password},config);
        localStorage.setItem("fmToken",data);
        alert("Login successful!");
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("fmToken")){
      navigate('/');
    }
  },[])

    return (
        <div style={{paddingBottom:50,backgroundColor: '#9A616D'}}>
<section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style={{borderRadius: '1rem'}}>
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="https://media.istockphoto.com/vectors/black-pregnant-woman-with-nature-and-leaves-background-concept-vector-vector-id1171915511?k=20&m=1171915511&s=612x612&w=0&h=TFn-oP-fUZDIXWtoIUz41zKsfyO2UCsXBz24lErpCj0="
                alt="login form"
                class="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}}
              />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form onSubmit={postData}>

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                    <span class="h1 fw-bold mb-0">Login</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style={{letterSpacing: 1}}>Sign into your account</h5>

                  <div class="md-form mb-4">
                    <input type="email" id="form2Example17" class="form-control form-control-lg" placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                  </div>

                  <div class="md-form mb-4">
                    <input type="password" id="form2Example27" class="form-control form-control-lg" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-lg btn-block" type="submit" style={{backgroundColor:'#9A616D'}}>Login</button>
                  </div>

                  <p class="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <NavLink exact to='/register' style={{color: '#393f81'}}>Register here</NavLink></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
        
    )
}

export default Login;