import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

const ProfilePic=({photo,username,userid})=>{

    const params=useParams();

    // alert(params.userid);

    const [currentUser, setCurrentUser] = useState("");
    const [btnText,setBtnText]=useState("");
    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("fmToken")}`
            }
        }
        axios.get('/api/user/getuser', config).then((data) => {
            setCurrentUser(data.data);
            console.log(data.data);
            let follow=false;
            for(let i=0;i<data.data.following.length;i++){
                if(data.data.following[i]._id===params.userid){
                    follow=true;
                    break;
                }
            }
            if(follow){
                setBtnText("Unfollow");
            } 
            else setBtnText("Follow");
        }).catch((error) => console.log(error));
    }, [])

    const followUser=async()=>{
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("fmToken")}`
                }
            }
            await axios.post('/api/user/followunfollow',{userid},config);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='text-center mb-4'>
            <img 
                src={photo}
                alt="profile pic"
                className='profile-pic rounded-circle m-3'
            />

            <h2 className='user-name'>{username}</h2>
            {
                (userid && currentUser._id!==userid)
                ?
                <Button variant="contained" sx={{ maxWidth: 200 }} style={{backgroundColor:'#A239EA'}} className='mt-2' onClick={followUser} >{btnText}</Button>
                :
                null
            }
        </div>
    );
};

export default ProfilePic;