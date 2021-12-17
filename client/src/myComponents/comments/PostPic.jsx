import React from 'react';

const ProfilePic=({title,photo})=>{
    return (
        <div className='text-center mb-4'>
            <img 
                src={photo} 
                alt="post pic"
                className='post-pic m-3'
            />

            <h2 style={{color:'#091353', fontFamily: `'Special Elite', cursive`}}>{title}</h2>
        </div>
    );
};

export default ProfilePic;