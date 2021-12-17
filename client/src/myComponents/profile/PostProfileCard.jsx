import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Fab from '@mui/material/Fab';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { useNavigate, useParams } from 'react-router-dom';

const PostProfileCard=({bio,followers,following,email,phone,username})=>{
    const {userid}=useParams();
    const [copied, setCopied] = useState(false);

    const navigate=useNavigate();

      const copy=()=>{
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
      }
    return (

        <div className='mx-auto'>
            <Card sx={{ width: '100%' }} style={{backgroundColor:'#E4BAD4'}}>
            
                <CardContent>
                    
                    <Typography variant="body2" color="text.secondary">

                        <div className='d-flex flex-row justify-content-between' style={{fontWeight:'bold'}}>
                        <div>Followers: {followers}</div>
                        <div>Following: {following}</div>
                        </div>

                        <div className='d-flex flex-row justify-content-between'>
                        <div><PersonIcon className='author-icon' />{username}</div>
                        </div>

                        <br />

                        <strong>{bio}</strong>
                        
                    </Typography>

                    <br />

                    { <>
                        <Typography className='profile-details' gutterBottom variant="subtitle2" component="div">
                            Email - <Typography className='inline-text' variant="body2" color="text.secondary">{email}</Typography>
                        </Typography>
                    </>}

                    {<>
                        <Typography className='profile-details' gutterBottom variant="subtitle2" component="div">
                            Contact No. - <Typography className='inline-text' variant="body2" color="text.secondary">{phone}</Typography>
                        </Typography>
                    </>}

                </CardContent>

                <CardActions className='profile-options'>

                    {/* <div>
                    {<>
                            <Fab className='like-button'>
                                <ThumbUpAltOutlinedIcon className='like-icon' />
                            </Fab>
                            <Typography className='inline-text' variant="body2" color="text.secondary">12345</Typography>
                        </>}
                    </div> */}
                    
                    {userid&&<div>
                        <Button size="small" onClick={copy}>{!copied ? "Share" : "Copied!"}</Button>
                    </div>}
                    {!userid&&<div>
                        <Button size="small"
                        onClick={()=>{
                            navigate('/update')
                        }}
                        >Edit Profile</Button>
                    </div>}
                </CardActions>
            </Card>

        </div>
    );
};

export default PostProfileCard;