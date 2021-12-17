import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

const CommentType=({id,type,commentedBy,initialText})=>{
    const {_id}=useParams();

    const [comment, typeComment] =React.useState('');
    const [currentUserId, setCurrentUserId] = useState("");
    let isDisabled=comment.trim().length==0;

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

    const submitComment=async()=>{
        try {
            if(comment&&comment.trim()){
                const config={
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${localStorage.getItem("fmToken")}`
                    }
                }
                if(id&&type=="reply"){
                    console.log(_id,' ',id);
                    await axios.post(`/api/posts/reply/${_id}`,{body:comment,parentId:id},config);
                    alert("Reply created!");
                }
                else if(id&&type=="edit"){
                    if(commentedBy!==currentUserId) alert("Only the author can edit comment!");
                    else{
                        // typeComment(initialText);
                        console.log("fgfxgx");
                        await axios.put(`/api/posts/updatecomment/${id}`,{body:comment},config);
                        alert("Comment updated!");
                    }
                }
                else{
                    await axios.post(`/api/posts/comment/${_id}`,{body:comment},config);
                    alert("Comment created!");
                }
                typeComment('');
                window.location.reload();
            }
            else alert("Please enter something!");
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (

        <>
            <TextField style={{backgroundColor:'#B5DEFF', color:'white'}}
                className='comment-textarea'
                id="outlined-multiline-flexible"
                // label="Multiline"
                placeholder="Type your Comment"
                multiline
                maxRows={4}
                value={comment}
                onChange={(e)=>{typeComment(e.target.value)}}
                />

            <Button variant="contained" className='comment-button' onClick={submitComment} disabled={isDisabled} >Comment</Button>
        </>
        
    );
}

export default CommentType;