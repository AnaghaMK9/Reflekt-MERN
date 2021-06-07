import React, { useContext, useState, useEffect } from 'react';
import { Container, CssBaseline, Typography, Grid, Box, Button, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright.js';

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

function Register(props) {
    const classes = useStyles();

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { userRegister, loading, error, isAuthenticated, clearErrors } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/login');
        }
        if (error) {
            error.forEach(element => {
                setAlert(element.msg, 'primary');
            });
            clearErrors();
        }
    }, [error, isAuthenticated, clearErrors, setAlert, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [checked, setChecked] = useState(false);
    const [cpassword, setCpassword] = useState('');


    const onChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (cpassword === user.password) {
            userRegister(user);
        } else {
            setAlert("Password should match", 'primary');
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            {loading && <Loading />}
            <Alert />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                type='text'
                                required
                                fullWidth
                                id="firstName"
                                label="Enter Your Name"
                                autoFocus
                                onChange={onChange}
                                value={user.name}
                            />
                        </Grid>
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
                                value={user.email}
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
                                value={user.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="cpassword"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => setCpassword(event.target.value)}
                                value={cpassword} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                onClick={() => setChecked(!checked)}
                                checked={checked}
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I agree with T&C."
                            />
                        </Grid>
                    </Grid>
                    {checked ? <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit} >
                        Sign Up
                    </Button> : <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled >
                        Sign Up
                    </Button>}
                </form>
                <Grid container justify="flex-end">
                    <Grid item>
                        <RouteLink to="/login" className={classes.links} variant="body2">
                            Already have an account? Login
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

export default Register;