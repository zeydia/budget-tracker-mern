import React, { useState } from 'react';
import {
    Container, Grid, Paper, Button, Typography,
    Alert, Box, Link
} from '@mui/material';


const Home = () => {


    return (
        <Container maxWidth="md" sx={{ mt: '60px' }}>
            <Box sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: '3rem' }}>
                        Bienvenue sur Budget Tracker IPSL
                    </Typography>
                    <Typography variant="body3" align="center" gutterBottom>
                        Bonjour mon nom est Seydou Diallo.
                        Bienvenue sur Budget Tracker IPSL un site produit en MERN:<br />
                        - MongoDB<br />
                        - ExpressJS<br />
                        - ReactJS<br />
                        - NodeJS<br />
                    </Typography>
                    <Grid sx={{ ml: 10, left: '2', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <Button color="primary" href="/login" variant="contained">
                            Connexion
                        </Button>
                        <Typography>Ou</Typography>
                        <Button color="primary" href="/register" variant="contained">
                            Creer un compte
                        </Button>
                    </Grid>
                    <Typography variant="body3" align="center" gutterBottom>
                        Retrouvez le code source sur mon GITHUB:<br />
                        <Link href="https://github.com/zeydia/budget-tracker-mern" >https://github.com/zeydia/budget-tracker-mern</Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};
export default Home;