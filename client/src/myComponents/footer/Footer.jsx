import {Typography,makeStyles,Grid,Box} from '@material-ui/core'
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import './footer.css';

const useStyle = makeStyles(theme=>({
    component: {
        background: 'black',
        // paddingBottom:80,
        position:'relative',
    },
    footertxt: {
        fontSize: 50,
        fontWeight: 600,
        color:'white',
        fontFamily: `'Marck Script', cursive`,
        [theme.breakpoints.between('200','700')]:{
            textAlign:'center',
            fontSize: 30,
        }
    },
    cpright:{
        color:'white',
        [theme.breakpoints.between('200','700')]:{
            textAlign:'center',
        },
    },
    comp:{
        display:'flex', 
        justifyContent:'space-between',
        marginLeft:10,
        marginRight:10,
        [theme.breakpoints.down('700')]:{
            display:'block', 
        }
    },
    compo:{
        marginLeft:'45%',
        [theme.breakpoints.between('700','1000')]:{
            marginLeft:'40%'
        },
        [theme.breakpoints.between('500','700')]:{
            marginLeft:'36%'
        },
        [theme.breakpoints.between('400','500')]:{
            marginLeft:'33%'
        },
        [theme.breakpoints.between('200','400')]:{
            marginLeft:'28%'
        },
    },
    head:{
        color:'white',
        marginLeft:'43%',
        [theme.breakpoints.between('700','1000')]:{
            marginLeft:'37%'
        },
        [theme.breakpoints.between('500','700')]:{
            marginLeft:'32%'
        },
        [theme.breakpoints.between('400','500')]:{
            marginLeft:'28%'
        },
        [theme.breakpoints.between('200','400')]:{
            marginLeft:'22%'
        },
    }
}));

const Footer = () => {
    const classes = useStyle();

    return (
        <Box className={classes.component}>

            <div style={{zIndex:10}}>
                <div style={{display: "block", }}>
                    <h3 className={classes.head} style={{fontSize:'22px'}}>Connect with us here</h3>

                    <Typography className={classes.compo}>
                        <a href=" " style={{color:'white',marginRight:10}}><FacebookIcon /></a>
                        <a href=" " style={{color:'white',marginRight:10}}><EmailIcon /></a>
                        <a href=" " style={{color:'white',marginRight:10}}><TwitterIcon /></a>
                        <a href=" " style={{color:'white',marginRight:10}}><LinkedInIcon /></a>
                        <a href=" " style={{color:'white',marginRight:10}}><InstagramIcon /></a>
                    </Typography>
                </div>

                <Grid item xs={12}>  
                    <Box className={classes.comp}>
                        <Typography className={classes.footertxt}>Femaissance</Typography>
                        <Typography className={classes.cpright}>Copyright ©2021 All rights reserved</Typography>
                    </Box>
                </Grid>

            </div>

            <div class="wave wave-1"></div>
            <div class="wave wave-2"></div>
            <div class="wave wave-3"></div>
            <div class="wave wave-4"></div>
        </Box>
    )
}

export default Footer;