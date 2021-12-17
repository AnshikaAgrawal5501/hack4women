import React,{useEffect, useState} from 'react';
import axios from 'axios';
import CommentCard from './CommentCard';
import CommentType from './CommentType';
import getComments from '../../api';
import { useParams } from 'react-router-dom';


const CommentGallery=()=>{

    const {_id}=useParams();

    const [comments, setComments]=React.useState([]);
    const [rootComments,setRootComments]=useState([]);

    const getReplies=(commentId)=>comments.filter((comment)=>{
        return comment.parentId===commentId;
    }).sort((a,b)=>{
        return new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime();
    });


    useEffect(()=>{
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("fmToken")}`
            }
        }
        axios.get(`/api/posts/getallcomment/${_id}`,config).then((res)=>{
            setComments(res.data);
            setRootComments(res.data.filter((comment)=>{
                return comment.parentId===null;
            }));
            showComments();
        }).catch((error)=>console.log(error));
    },[])

    const showComments=()=>{
        console.log(comments);
        console.log(rootComments);
    }

    const addComment=(text,parentId)=>{
        
    };

    React.useEffect(()=>{
        getComments().then((data)=>{
            setComments(data);
        });
    },[]);

    return (
        <div className='col-lg-8 col-md-7'>
            <div className='comment-gallery d-flex flex-column'>
                <h1 className='heading mb-0' style={{color:'#FBFF00'}}>Comment Gallery</h1>

                <hr />

                {/* <CommentType handleSubmit={addComment} /> */}
                <CommentType />

                <div className="post-grid abc d-flex flex-row flex-wrap justify-content-center align-content-start cmt-gallery">
                {
                        rootComments.map((comment)=>{
                            return <CommentCard
                                key={comment._id}
                                body={comment.body}
                                createdAt={comment.createdAt}
                                username={comment.commentedBy.username}
                                replies={getReplies(comment._id)}
                                id={comment._id}
                                ownId={comment._id}
                                commentedBy={comment.commentedBy._id}
                                initialText={comment.body}
                                parentId={comment.parentId}
                                likes={comment.likes.length}
                                photo={comment.commentedBy.photo}
                             />
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default CommentGallery;