import React,{useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import ProfilePic from './ProfilePic';
import PostProfileCard from './PostProfileCard';
import { useEffect } from 'react';

const Bio=()=>{

    const [user,setUser]=useState();

    const {userid}=useParams();
    // alert(userid);

    const fetchData=async()=>{
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("fmToken")}`
            }
        }
        if(!userid){
            const {data}=await axios.get('/api/user/getuser',config);
            console.log(data);
            setUser(data);
        }
        else{
            const {data}=await axios.get(`/api/user/getotheruser/${userid}`,config);
            setUser(data);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div className='col-md-4 col-sm-5'>
            <div className='d-flex flex-column '>
                <ProfilePic
                photo={user?user.photo:null}
                username={user?user.username:null}
                userid={userid}
                />

                <PostProfileCard
                    bio={user?user.bio:null}
                    followers={user?user.followers.length:null}
                    following={user?user.following.length:null}
                    email={user?user.email:null}
                    phone={user?user.phone:null}
                    username={user?user.username:null}
                 />
            </div>
        </div>
    );
};

export default Bio;