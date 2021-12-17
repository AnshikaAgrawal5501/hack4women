import react, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import "aos/dist/aos.css";
import { Box, Button, Dialog, DialogContent, makeStyles, TextField, Typography } from '@material-ui/core';
import './contact.css';

const useStyle = makeStyles(theme => ({

    image: {
        backgroundImage: `url(${'https://dgmt.co.za/wp-content/themes/dgmt17/embrace/mothers-embrace.jpg'})`,
        height: 564,
        backgroundRepeat: 'no-repeat',
        width: '40%',
        marginBottom: 20,
        backgroundPosition: 'center',
        borderTopRightRadius:25,
        '& > *': {
            color: 'white',
            fontWeight: 600
        },
        [theme.breakpoints.between('200', '800')]: {
            width: '100%',
            marginTop: 50,
            borderTopRightRadius:0,
        },
    },
    login: {
        padding: '80px 85px',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginTop: -50,
        '& > *': {
            marginTop: 20
        },
        [theme.breakpoints.between('200', '800')]: {
            marginTop: -100,
        },
    },
    loginBtn: {
        textTransform: 'none',
        background: '#fb641b',
        color: '#ffffff',
        height: 48,
        borderRadius: 2
    },
    flexing: {
        display: 'flex',
        paddingBottom:20,
        [theme.breakpoints.between('200', '800')]: {
            display: 'block',
        },
    },
    textsty: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#63B4B8',
        [theme.breakpoints.between('600', '800')]: {
            marginLeft: '0%',
        },
        [theme.breakpoints.between('200', '600')]: {
            marginLeft: '0%',
        },
    }
}));

const Contact = () => {
    const classes = useStyle();

    useEffect(() => {
        AOS.init({
          duration : 1000
        });
        }, []);

    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [subject,setSubject]=useState("");
    const [message,setMessage]=useState("");

    const sendEmail=async()=>{
        try {
            if(!username.trim()||!email.trim()||!subject.trim()||!message.trim()) alert("Don't leave any field empty!");
            else{
                const config={
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
                await axios.post('api/user/sendemail',{username,email,subject,message},config);
                setUsername("");
                setEmail("");
                setSubject("");
                setMessage("");
                alert("Thank you! Please check your inbox!");
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong!");
        }
    }

    return (
        <div className="contactsvg" data-aos={"fade-right"}>
            <div className="divider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                </svg>
            </div>


            <Box className={classes.flexing}>
                <Box className={classes.image}>
                </Box>

                <Box className={classes.login}>
                    <p className='textsty heading' >Report to Us</p>

                    <TextField name='firstname' label='Enter your Name' value={username} onChange={(e)=>setUsername(e.target.value)} />
                    <TextField name='email' label='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <TextField name='subject' label='Subject' value={subject} onChange={(e)=>setSubject(e.target.value)} />
                    <TextField name='text' label='Your Message here' value={message} onChange={(e)=>setMessage(e.target.value)} />
                    <Button variant="contained" className={classes.loginBtn} onClick={sendEmail} >Send Message</Button>
                </Box>
            </Box>
        </div>
    )
}

export default Contact;