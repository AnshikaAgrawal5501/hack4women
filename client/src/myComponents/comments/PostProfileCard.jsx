import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Fab from '@mui/material/Fab';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const PostProfileCard=({postedBy,time,like,body})=>{

    const {_id}=useParams();

    const likePost=async()=>{
        try {
          const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("fmToken")}`
            }
        }
          await axios.post('/api/posts/like',{postid:_id},config);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }

      const [copied, setCopied] = useState(false);

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

        <div className='mx-auto' >
            <Card className='comment-page-card-data' style={{backgroundColor:'#D7E9F7'}}>
            
                <CardContent>
                    
                    <Typography variant="body2" color="text.secondary" style={{fontWeight:'bold'}}>

                        {/* <div className='d-flex flex-row justify-content-between'>
                            {props.followers && <div>Followers - 1234</div>}
                            {props.following && <div>Following - 234</div>}
                        </div> */}

                        <div className='d-flex flex-row justify-content-between'>
                        <div><PersonIcon className='author-icon u-ico'/> {postedBy}</div>
                            <div><AccessTimeIcon className='author-icon u-ico' /> {time}</div>
                        </div>

                        <br />

                         <>
                            {body?parse(body):null}
                        </>

                        {/* {props.caption && <>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type 
                            specimen book.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type 
                            specimen book.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type 
                            specimen book.
                        </>} */}
                        
                    </Typography>

                    <br />

                    {/* {props.email && <>
                        <Typography className='profile-details' gutterBottom variant="subtitle2" component="div">
                            Email - <Typography className='inline-text' variant="body2" color="text.secondary">anshikaagrawal5501@gmail.com</Typography>
                        </Typography>
                    </>}

                    {props.phone && <>
                        <Typography className='profile-details' gutterBottom variant="subtitle2" component="div">
                            Contact No. - <Typography className='inline-text' variant="body2" color="text.secondary">XXXXX XXXXX</Typography>
                        </Typography>
                    </>} */}

                </CardContent>

                <CardActions className='profile-options'>

                    <div>
                    <>
                            <Fab className='like-button' onClick={likePost}>
                                <ThumbUpAltOutlinedIcon className='like-icon' />
                            </Fab>
                            <Typography className='inline-text' variant="body2" color="text.secondary">{like}</Typography>
                        </>
                    </div>
                    
                    <div>
                        <Button size="small"onClick={copy}>{!copied ? "Share" : "Copied!"}</Button>
                    </div>
                    
                </CardActions>
            </Card>

        </div>
    );
};

export default PostProfileCard;