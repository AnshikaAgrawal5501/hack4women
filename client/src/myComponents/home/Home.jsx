import React, { useEffect } from 'react';
import Banner from './Banner';
import About from './about/About';
import Contact from './contact/Contact';
import Features from './features/Features.js';
import AOS from 'aos';
import "aos/dist/aos.css";
import { Box,makeStyles } from '@material-ui/core';

const useStyle =makeStyles({
    component:{
        marginTop:-50,
        background:'#F2F2F2',
    }
})

const Home = () => {
    const classes = useStyle();

    useEffect(() => {
        AOS.init({
          duration : 1000
        });
        }, []);

    return (
        <>
            <Box className={classes.component}>
                <Banner />
                <Features />
                <About data-aos={"fade-left"} />
                <Contact data-aos={"fade-right"} />
            </Box>
        </>
    )
}

export default Home;
