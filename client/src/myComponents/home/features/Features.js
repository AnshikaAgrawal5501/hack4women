import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AOS from 'aos';
import "aos/dist/aos.css";
import { Typography, makeStyles, Card, CardMedia, CardActionArea, Button, CardContent, CardActions, Divider } from '@material-ui/core'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: '#E2C2B9',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function Features() {
  React.useEffect(() => {
    AOS.init({
      duration : 1000
    });
    }, []);
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: '#040303', overflow: 'hidden' }} data-aos={"fade-right"}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box 
          component="img"
          src={process.env.PUBLIC_URL + '/images/Pregnancy04.jpg'}
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
            
          }}
        />
        <Typography className='heading' variant="h4" marked="center" component="h2" sx={{ mb: 14 }} style={{color: 'white'}}>
          Our Features
        </Typography>
        <div >
          <Grid container spacing={5} className='d-flex justify-content-center'>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src={process.env.PUBLIC_URL + '/images/femaledoc.svg'}
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h6" align="center" style={{color: '#FFFFFF'}}>
                To connect the expertise in field of gynaecology and physiologist dealing with mental depression to a society of pregnant women
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src={process.env.PUBLIC_URL + '/images/share.svg'}
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h6" align="center" style={{color: '#FFFFFF'}}>
                To build a very transparent and accountable system which allows the flow of legitimate opinions regarding pregnancy through posts and comments
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src={process.env.PUBLIC_URL + '/images/Anonymous_Chat_icon.svg'}
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h6" align="center" style={{color: '#FFFFFF'}}>
                This is a no-abuse platform, which deals with sensitive content and so in order to maintain the discipline we introduced the report option for all our users
                </Typography>
              </Box>
            </Grid>


            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src={process.env.PUBLIC_URL + '/images/mommy.svg'}
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h6" align="center" style={{color: '#FFFFFF'}}>
                Most importantly this platform has provided equal right of expression to every women regardless of being from rural or urban
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src={process.env.PUBLIC_URL + '/images/1542318784.svg'}
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h6" align="center" style={{color: '#FFFFFF'}}>
                To not build language as a barrier, we provide the privilege to connect in their own regional languages
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default Features;