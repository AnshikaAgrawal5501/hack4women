import {React, useState} from 'react';
import { Box,makeStyles, Typography} from '@material-ui/core';
import { NavLink ,useNavigate} from 'react-router-dom';
import './header.css';

const useStyle = makeStyles(theme=>({
    login: {
        background: '#FFFFFF',
        color: '#2874f0',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        padding: '5px 10px',
        marginTop:3,
        boxShadow:'none',
        [theme.breakpoints.down('sm')]:{
            background: 'purple',
            color:'#fff'
        }
    },
    wrapper: {
        margin: '0 7% 2 auto',
        display: 'flex',
        '& > *': {
            marginRight: 50,
            alignItems:'center',
            textDecoration:'none',
            color:'#fff',
            [theme.breakpoints.down('sm')]:{
                color:'#2874f0',
                alignItems:'center',
                display:'flex',
                flexDirection:'column',
                marginTop:10,
                backgroundColor:'purple',
                width:'100%',
                boxShadow: '5px 5px #98BAE7',
                borderRadius:5,
                padding:3,
            }
        },
        [theme.breakpoints.down('sm')]:{
            display:'block',
        }
    },
}));

const HeaderButtons = () => {
    const classes = useStyle();

    const navigate=useNavigate();

    return (
        <Box className={classes.wrapper}>
            <NavLink exact to="/posts"><Typography style={{marginTop:5 ,cursor:'pointer',color:'#fff',fontWeight:600}}>Posts</Typography></NavLink>
            <NavLink exact to="/upload"><Typography style={{marginTop:5,cursor:'pointer',color:'#fff',fontWeight:600}}>Upload</Typography></NavLink>
            <NavLink activeClassName="active" exact to="/dashboard"
            onClick={()=>{
                navigate('/dashboard')
                window.location.reload();
            }}
            >
            <Typography style={{marginTop:5 ,cursor:'pointer',color:'#fff',fontWeight:600}}>DashBoard</Typography></NavLink>
            <NavLink exact to="/users"><Typography style={{marginTop:5,cursor:'pointer',color:'#fff',fontWeight:600}}>Users</Typography></NavLink>
            {/* <NavLink exact to="/update"><Typography style={{marginTop:5,cursor:'pointer',color:'#fff',fontWeight:600}}>Update Profile</Typography></NavLink> */}
            <NavLink exact to="/followingposts"><Typography style={{marginTop:5,cursor:'pointer',color:'#fff',fontWeight:600}}>Following Posts</Typography></NavLink>
            {
                localStorage.getItem("fmToken")
                ?
                <p onClick={()=>{
                    localStorage.removeItem("fmToken");
                    alert("Logged out successfully");
                    navigate('/login');

                }}><Typography style={{marginTop:5,cursor:'pointer',color:'#fff',fontWeight:600}}>Logout</Typography></p>
                :
                <>
                <NavLink exact to="/login"><Typography style={{marginTop:5,cursor:'pointer',color:'#fff',fontWeight:600}}>Login</Typography></NavLink>
                <NavLink exact to="/register"><Typography style={{marginTop:5,cursor:'pointer',color:'#fff',fontWeight:600}}>Register</Typography></NavLink>
            </>
            }
            
        </Box>
    )
}

export default HeaderButtons;