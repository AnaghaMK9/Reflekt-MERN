import React, { useContext, useState, useEffect } from 'react';
import { Container, CssBaseline, Typography, Button, TextField, Grid, Box } from '@material-ui/core';
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

function Login(props) {
    const classes = useStyles();

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { login, loading, error, isAuthenticated, clearErrors, user } = authContext;

    useEffect(() => {
        if (user && isAuthenticated) {
            props.history.push('/dashboard');
        }
        if (error) {
            error.forEach(err => {
                setAlert(err.msg, 'primary');
            });
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, clearErrors, setAlert, user, props.history]);

    const [userData, setUser] = useState({
        email: '',
        password: ''
    });

    const onChange = (event) => {
        setUser({ ...userData, [event.target.name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        login(userData);
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            {loading && <Loading />}
            <Alert />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={onChange}
                                value={userData.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={onChange}
                                value={userData.password}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                </form>
                <Grid container justify="space-between">
                    <Grid item>
                        <RouteLink to="/register" variant="body2" className={classes.links}>
                            Sign Up
                            </RouteLink>
                    </Grid>
                    <Grid item>
                        <RouteLink to="/password/forgot" variant="body2" className={classes.links}>
                            Forgot Password?
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

export default Login;