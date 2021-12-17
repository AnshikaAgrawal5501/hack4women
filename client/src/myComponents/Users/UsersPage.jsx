import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import UserCard from './UserCard';
import Loader from '../loader/Loader';
import {useNavigate} from 'react-router-dom'


const UserPage=()=>{
    const navigate=useNavigate()
    const [value, setValue] =React.useState('');
    const [loading,setLoading]=useState(true);

    function submit() {
        console.log(value);
        setValue('');
    }

    const [users,setUsers]=useState([]);

    useEffect(()=>{
        if(!localStorage.getItem("fmToken")){
            navigate("/login");
          }
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("fmToken")}`
            }
        }
        axios.get('/api/user/getallusers',config).then((res)=>{
            setUsers(res.data);
            console.log(res.data);
            setLoading(false);
        }).catch((error)=>console.log(error));
    },[])

    return (

        <div style={{minHeight:'90vh',backgroundColor: '#805867',backgroundImage: `url("https://www.transparenttextures.com/patterns/xv.png")`}}>
            <div className='user-page d-flex flex-column' style={{paddingTop:80, paddingBottom:'175px'}}>
                <h1 className='heading' style={{color:'#FFD8CC'}}>Users &nbsp; Page</h1>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent:'center',marginBottom:5 }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Search for a User" variant="standard" sx={{width:'450px'}} value={value}
                    onChange={async(e)=>{
                        try {
                            setValue(e.target.value);
                            const config={
                                headers:{
                                    "Content-Type":"application/json",
                                    Authorization:`Bearer ${localStorage.getItem("fmToken")}`
                                }
                            }
                            const {data}=await axios.post('/api/user/getselecteduser',{field:e.target.value},config);
                            setUsers(data);
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    />
                    <SearchIcon onClick={submit} />
                </Box>

                <div className="d-flex flex-row flex-wrap justify-content-center cmt-gallery">
                    {
                        users.length>0
                        ?
                        users.map((user,ind)=>{
                            return <UserCard
                            key={user._id}
                            username={user.username}
                            email={user.email}
                            profilePic={user.photo}
                            id={user._id}
                        />
                        })
                        :
                        (loading?<Loader/>:<h2>No user to show!</h2>)
                    }


                </div>
            </div>
        </div>
    );
};

export default UserPage;