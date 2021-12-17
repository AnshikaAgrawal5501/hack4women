import React from 'react';
import PostProfileCard from './PostProfileCard';
import PostPic from './PostPic';

const PostData=({postedBy,createdAt,like,body,title,photo})=>{

    

    return (
        <div className='col-lg-4 col-md-5'>
            <div className='d-flex flex-column'>
                <PostPic title={title?title:null} photo={photo?photo:"Post Pic"} />

                <PostProfileCard
                    caption={'caption'}
                    postedBy={postedBy?postedBy:null}
                    time={createdAt?createdAt:null}
                    like={like>=0?like:null}
                    body={body?body:null}
                 />
            </div>
        </div>
    );
};

export default PostData;