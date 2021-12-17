import React from 'react';

const ProfilePic=()=>{
    return (
        <div className='text-center mb-4'>
            <img 
                src={process.env.PUBLIC_URL + '/images/login.jpg'} 
                alt="post pic"
                className='post-pic m-3'
            />

            <h2 >Title of the Post</h2>
        </div>
    );
};

export default ProfilePic;