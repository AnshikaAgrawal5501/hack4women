import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import { Box, Button, Dialog, DialogContent, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    component: {
        height: '66.30vh',
        width: '90vh',
        [theme.breakpoints.down('sm')]: {
            marginLeft: -80,
            width: '65vh',
            height: '80vh',
        }
    },
    image: {
        backgroundImage: `url(${'https://d3q79wa8h7wjl9.cloudfront.net/wp-content/uploads/2019/05/forwebmomswithkidsplaygroupAdobeStock_197021867-1024x682.jpeg'})`,
        height: 500,
        backgroundRepeat: 'no-repeat',
        width: '40%',
        backgroundPosition: 'center',
        padding: '105px 35px',
        '& > *': {
            color: 'white',
            fontWeight: 600
        },
        [theme.breakpoints.between('800', '1000')]: {
            height: '100vh',
            marginTop: 50,
        },
        [theme.breakpoints.between('200', '800')]: {
            width: '100%',
            marginTop: -735
        },
    },
    login: {
        padding: '80px 85px',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        fontWeight: 'bold',
        '& > *': {
            marginTop: 20
        },
        [theme.breakpoints.between('200', '800')]: {
            padding: '190px 85px',
        },
    },
    text: {
        color: '#878787',
        fontSize: 12
    },
    loginBtn: {
        textTransform: 'none',
        background: '#fb641b',
        color: '#ffffff',
        height: 48,
        borderRadius: 2
    },
    requestBtn: {
        textTransform: 'none',
        background: '#ffffff',
        color: '#2874f0',
        height: 48,
        borderRadius: 2,
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)'
    },
    createText: {
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 20,
        fontSize: 14,
        color: '#2874f0',
        fontWeight: 600,
        cursor: 'pointer'
    },
    flexing: {
        display: 'flex',
        [theme.breakpoints.between('200', '800')]: {
            display: 'block',
        },
    },
    boxx: {
        marginLeft: 120,
        marginRight: 120,
        [theme.breakpoints.between('500', '1000')]: {
            marginLeft: 50,
            marginRight: 50,
        },
        [theme.breakpoints.between('200', '500')]: {
            marginLeft: 10,
            marginRight: 10,
        },
    }
}));

const About = () => {
    const classes = useStyle();

    useEffect(() => {
        AOS.init({
          duration : 1000
        });
        }, []);

    return (
        <div style={{ backgroundColor: '#BFA2DB', paddingTop: 50, paddingBottom: 50 }} data-aos={"fade-left"} >
            <div className={classes.boxx}>
                <div class="card mb-3" style={{ maxWidth: '1300px' }}>
                    <div class="row g-0">
                        <div class="col-md-9">
                            <div class="card-body">
                                <h5 class="card-title" style={{fontFamily: `'Handlee', cursive`,
    fontWeight: 'bolder',
    fontSize: '50px'}}>Our Platform Outlook</h5>
                                <p class="card-text" style={{ color: '#17D7A0' }}>Everyone talks about the miracle of childbirth and pregnancy glows, but not many speak about the never-ending aches
                                    d pains, and insomnia that go along with it. A woman’s body goes through a lot during pregnancy, and while the female
                                    body is built to handle such a miraculous event, it is by no means a comfortable experience to go through. Even healthy
                                    women can experience problems during pregnancy and after that as well. It is just something that happens. While most
                                    pregnancy problems are common and experienced by expectant mothers, it is always best to keep your doctor updated on
                                    changes that you may be experiencing</p>
                                <p class="card-text" style={{ color: '#2F86A6' }}>So considering the issues every women comes across regardless of being from urban or rural areas, We have come up with an
                                    initiative called <strong>Femaissance</strong> which would not only help women to connect to each other and lift up their overwhelming changes
                                    but also connect and contact expertise across the globe.</p>
                                <p class="card-text" style={{ color: '#FF5DA2' }}>This platform would give freedom to its users to post ,like, comment and share to increase awareness among all the women.</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <img
                                src={process.env.PUBLIC_URL + '/images/mom.jfif'}
                                alt="..."
                                class="img-fluid rounded-start"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
