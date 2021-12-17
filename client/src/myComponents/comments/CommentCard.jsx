import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Fab from '@mui/material/Fab';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CommentType from './CommentType';

// const fiveMinutes = 300000;
// const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
// const canDelete =currentUserId === comment.userId && replies.length === 0 && !timePassed;
// const canReply = Boolean(currentUserId);

const CommentCard = (props) => {

   
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);

    const [currentUserId, setCurrentUserId] = useState("");

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("fmToken")}`
            }
        }
        axios.get('/api/user/getuser', config).then((data) => {
            setCurrentUserId(data.data._id);
            console.log(data.data._id);
        }).catch((error) => console.log(error))
    }, [])

    const deleteComment=async()=>{
        try {
                if(currentUserId!==props.commentedBy) alert("Only author can delete comment!");
                else{
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("fmToken")}`
                        }
                    }
                    await axios.delete(`/api/posts/deletecomment/${props.ownId}`,config);
                    alert("Comment deleted!");
                    window.location.reload();
                }
        } catch (error) {
            console.log(error);
        }
    }

    const likeComment=async()=>{
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("fmToken")}`
                }
            }
            // alert(props.ownId);
            await axios.put(`/api/posts/comment/like`,{commentId:props.ownId},config);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    function timeDifference(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
            if(elapsed/1000 < 30) return "Just now";
            
            return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';   
        }
    
        else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        }
    
        else {
            return Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }


    

    return (
        <>
            {
                !editing&&
                <Card sx={{ display: 'flex', height: 'fit-content', marginLeft: props.shifted ? '75px !important' : '' }} className='comment-card my-2 mx-3 cmt-card' style={{ backgroundColor: '#FFDAC7' }}>

                <CardMedia
                    component="img"
                    sx={{ maxWidth: 150 }}
                    image={props.photo}
                    alt="Live from space album cover"
                    className='comment-card-img rounded-circle'
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                    <CardContent>

                        <Typography variant="body2" color="text.secondary" style={{ color: 'black' }}>

                            <div className='d-flex flex-row justify-content-between'>
                                <div><PersonIcon className='author-icon' /> {props.username}</div>
                                <div><AccessTimeIcon className='author-icon' /> {timeDifference(new Date(), new Date(props.createdAt))}</div>
                            </div>

                            <br />

                            {props.body}
                        </Typography>

                    </CardContent>

                    <CardActions className='profile-options'>

                        <div>
                            <Fab className='like-button' onClick={likeComment}>
                                <ThumbUpAltOutlinedIcon className='like-icon' />
                            </Fab>
                            <Typography className='inline-text' variant="body2" color="black">{props.likes}</Typography>

                        </div>

                        <div>
                            <Button size="small" onClick={() => {
                                setReplying(!replying)
                            }}>Reply</Button>
                            {currentUserId===props.commentedBy?<Button size="small" onClick={()=>{
                                setEditing(!editing)
                            }}>Edit</Button>:null}
                            {currentUserId===props.commentedBy?<Button size="small" onClick={deleteComment}>Delete</Button>:null}
                        </div>

                    </CardActions>
                </Box>

            </Card>}

            

            {
                replying && <CommentType id={props.id} type="reply" />
            }

{
                editing && <CommentType id={props.ownId} type="edit" commentedBy={props.commentedBy} />
            }

{
                (replying||editing)&&<Button variant="contained" className='comment-button' onClick={()=>{
                    setEditing(false)
                    setReplying(false)
                }} >Cancel</Button>
            }
            {
                props.replies.length > 0 && props.replies.map((reply) => {
                    return <CommentCard
                        key={reply.id}
                        body={reply.body}
                        createdAt={reply.createdAt}
                        username={reply.commentedBy.username}
                        replies={[]}
                        shifted={true}
                        id={props.id}
                        ownId={reply._id}
                        commentedBy={reply.commentedBy._id}
                        initialText={reply.body}
                        parentId={reply.parentId}
                        likes={reply.likes.length}
                        photo={reply.commentedBy.photo}
                    />
                })

            }
        </>
    );
};

export default CommentCard;
