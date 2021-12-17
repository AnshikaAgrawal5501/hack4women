import React, { useEffect, useState } from 'react';
import Bio from './Bio';
import PostGallery from './PostGallery';
import {useNavigate} from 'react-router-dom'

const DashBoard=()=>{
    const navigate=useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("fmToken")){
            navigate("/login");
          }
    },[])
    return (
        <>
            <div style={{paddingTop:80,paddingBottom:175,backgroundColor: '#D7E9F7',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/gplay.png")'}}>
                <div className='container d-flex'>

                    <div className="row" style={{width:'100%'}}>
                        <Bio />
                        <PostGallery />
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default DashBoard;