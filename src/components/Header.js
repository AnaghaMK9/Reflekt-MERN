import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    links: {
        color: 'inherit',
        textDecoration: 'none'
    }
}));

function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to='/' className={classes.links}>
                            Reflekt</Link>
                    </Typography>

                    <Link to='/login' className={classes.links} >
                        <Button color="inherit">Login</Button>
                    </Link>
                    <Link to='/register' className={classes.links}>
                        <Button color="inherit">Sign Up</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Header;