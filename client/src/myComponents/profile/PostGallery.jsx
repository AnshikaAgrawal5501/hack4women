import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Loader from '../loader/Loader';
import { useParams } from 'react-router-dom';

const PostGallery=()=>{

    const {userid}=useParams();
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(true);

    const fetchData=async()=>{
        try{
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("fmToken")}`
                }
            }
            if(!userid){
                const {data}=await axios.get('/api/user/getuser',config);
                let res=await axios.get(`/api/user/posts/${data._id}`,config);
                setLoading(false);
                setPosts(res.data);
                console.log(data);
            }
            else{
            let res=await axios.get(`/api/user/posts/${userid}`,config);
            setLoading(false);
            setPosts(res.data);
            }
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div className='col-md-8 col-sm-7'>
            <div className='post-gallery d-flex flex-column'>
                <h1 className='heading mb-0' style={{color:'#01937C'}}>Post Gallery</h1>

                <hr />

                <div className="post-grid d-flex flex-row flex-wrap justify-content-center cmt-gallery">
                    {
                        posts.length>0
                        ?
                        posts.map(((post,ind)=>{
                            return <PostCard userid = {post.postedBy._id} key={post._id} title={post.title} body={post.excerpt} photo={post.photo?post.photo:"https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"} id={post._id}/>
                        }))
                        :
                        (loading?<Loader/>:<p>No post to show!</p>)
                    }
                </div>
            </div>
        </div>
    );
};

export default PostGallery;