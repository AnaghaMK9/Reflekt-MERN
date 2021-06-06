import React from 'react';
import { Container, CssBaseline, Typography, Grid, Box, Button } from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright.js';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    links: {
        color: 'inherit',
        textDecoration: 'none'
    }
}));

function Home() {
    const classes = useStyles();
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                {/* <Avatar className={classes.avatar}>
                     <LockOutlinedIcon/> 
                </Avatar> */}
                <Typography component='h1' variant='h1'>
                    Reflekt
                </Typography>
                <form className={classes.form}>
                    <Grid container justify='center' spacing={2} >
                        <Typography component='h1' variant='h6'>
                            Get Writing. Start Reflecting.
                        </Typography>
                    </Grid>
                    <RouteLink to='/login' className={classes.links}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Start Writing Now.
                        </Button>
                    </RouteLink>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default Home;