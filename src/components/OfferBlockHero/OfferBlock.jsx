import React from 'react';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { buttonStyles, textStylesTitle, textStylesBody1, textStylesH4 } from '../../pages/Styles/styles';
import { useNavigate } from 'react-router-dom';
import styles from '../OfferBlockHero/styles.module.css'


function OfferBlock() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/home/WithoutRegistration')
       }

    return (
        <Grid container sx={{ maxWidth: '100%', justifyContent: 'center', textAlign: 'center' }}>

            <Grid size={8} sx={{ marginBottom:'100px'}}>
                <Typography variant="h1" sx={{ ...textStylesTitle, margin: '86px 0 24px' }}>
                    Collaborate with others or implement your own projects
                </Typography>
                <Typography variant="body1" sx={{ ...textStylesBody1, margin: '0 auto', width: '65%' }}>
                    Multiwork is a platform where you can easily find specialists for your work, work on personal projects and gain valuable
                    experience in cooperation with other projects, which will contribute to professional development.
                </Typography>
                <Button  variant="contained" onClick={handleGetStarted} sx={{...buttonStyles, borderRadius: '8px', padding: '16px 24px', width: '155px', height: '60px',marginTop: '24px', background: '#814AEB', 
                            color: '#FFF', textTransform: 'capitalize',
                        }} aria-label="Get started"> Get started </Button>
            </Grid>

            <Grid size={12} sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#E2D5FF', py: 3}}>
                <div className={styles.marqueeContainer}>
                    <Typography variant="body2" className={styles.marqueeText} sx={{...textStylesH4, color: '#0A0A0A'}}>
                        Welcome to Multiwork! Join projects and develop professional skills.
                    </Typography>
                    <Typography variant="body2" className={styles.marqueeText} sx={{...textStylesH4, color: '#0A0A0A'}} >
                        Welcome to Multiwork! Join projects and develop professional skills.
                    </Typography>
                    <Typography variant="body2" className={styles.marqueeText} sx={{...textStylesH4, color: '#0A0A0A'}}>
                        Welcome to Multiwork! Join projects and develop professional skills.
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
}

export default OfferBlock;
