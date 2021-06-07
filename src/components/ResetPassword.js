import React, { useEffect, useState, useContext } from 'react'
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

function ResetPassword(props) {
    const classes = useStyles();

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { loading, resetPassword, error, clearErrors, isAuthenticated, msg, clearStatus } = authContext;

    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/login');
        }
        if(msg) {
            setAlert(msg,'primary');
            clearStatus();
        }
        if (error) {
            error.forEach(err => {
                setAlert(err.msg, 'primary');
            });
            clearErrors();
        }
    }, [error, clearErrors, setAlert, props.history, isAuthenticated, msg, clearStatus]);

    const onSubmit = (event) => {
        event.preventDefault();
        if (password === cpassword) {
            resetPassword(password);
        } else {
            setAlert('Password must match', 'primary');
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            {loading && <Loading />}
            <Alert />
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Reset Password
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => setCpassword(event.target.value)}
                                value={cpassword}
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

export default ResetPassword;