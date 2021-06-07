import React, { useContext, useEffect, useState } from 'react'
import { Container, CssBaseline, Typography, Grid, Box, Button, TextField } from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom';
import Copyright from './Copyright.js';
import { makeStyles } from '@material-ui/core/styles';

import AuthContext from '../context/auth/AuthContext.js';
import AlertContext from '../context/alert/AlertContext.js';
import Loading from './Loading.js';
import Alert from './Alert.js';

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

function ForgotPassword() {
    const classes = useStyles();

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { loading, forgotPassword, error, clearErrors } = authContext;

    useEffect(() => {
        if (error) {
            error.forEach(err => {
                setAlert(err.msg, 'primary');
            });
            clearErrors();
        }
    }, [error, clearErrors, setAlert]);

    const [email, setEmail] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        forgotPassword(email);
        //setAlert('Password reset link sent to your email.', 'primary');
    }
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            {loading && <Loading />}
            <Alert />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Forgot Password
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                // required
                                fullWidth
                                name="email"
                                label="Enter Registered Email."
                                type="email"

                                autoComplete="current-password"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Confirm
                    </Button>
                </form>
                <Grid container justify="flex-end">
                    <Grid item>
                        <RouteLink to="/login" variant="body2" className={classes.links}>
                            Login here
                            </RouteLink>
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default ForgotPassword;