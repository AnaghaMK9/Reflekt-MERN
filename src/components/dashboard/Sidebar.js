import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import {
    AppBar,
    CssBaseline,
    List,
    Toolbar,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListItemSecondaryAction,
    IconButton,
    TextField,
    Button
} from '@material-ui/core';
import { AddBox, ExitToApp, MenuBook, Delete, Search } from '@material-ui/icons';
import Main from './Main';
import Instructions from './Instructions.js';
import SearchResults from 'react-filter-search';
//context
import JournalContext from '../../context/dashboard/JournalContext.js';
import AuthContext from '../../context/auth/AuthContext';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    grow: {
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    setActive: {
        backgroundColor: 'rgba(144, 103, 166,0.5)',
        hover: 'none'
    },

}));

function Sidebar() {
    const journalContext = useContext(JournalContext);
    const {
        journals,
        setJournals,
        deleteJournal,
        activeJournal,
        setActiveJournal,
        addJournal
    } = journalContext;
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const [data, setData] = useState({
        title: 'Untitled Journal',
        journalbody: "this is body.."
    });
    // const [searchArray, setSearchArray] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setJournals();
        // eslint-disable-next-line
    }, []);

    const onSearch = (event) => {
        setSearchValue(event.target.value);
    }
    const classes = useStyles();

    const onAddEntry = (event) => {
        event.preventDefault();
        const { title, journalbody } = data;
        addJournal(title, journalbody);

    }

    const onEditEntry = (id) => {
        setActiveJournal(id);
    }

    const onClick = () => {
        if (localStorage.token && localStorage.token_one) {
            localStorage.removeItem('token');
            localStorage.removeItem('token_one');
            window.location.href = '/';
        } else if (localStorage.token) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar justify='space-between' position='fixed' className={classes.appBar}>
                <Toolbar>
                    <Typography variant='h6' >
                        Welcome To Dashboard, {user.name}!
                    </Typography>
                    <div className={classes.grow} />
                    <Button onClick={handleClickOpen} color='inherit'>
                        Instructions
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant='permanent'
                classes={{
                    paper: classes.drawerPaper
                }}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem
                            button
                            component={Link} to='/'
                            onClick={onAddEntry}>
                            <ListItemIcon><AddBox /></ListItemIcon>
                            <ListItemText primary='Add Entry' />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemIcon><Search /></ListItemIcon>
                            <TextField placeholder='Search Journals'
                                onChange={onSearch}
                                fullWidth />
                        </ListItem>
                    </List>
                    <List>
                        <SearchResults
                            value={searchValue}
                            data={journals}
                            renderResults={journals => (
                                journals.map((journal) => (
                                    <ListItem button key={journal._id}
                                        onClick={() => onEditEntry(journal._id)}
                                        className={journal._id === activeJournal && classes.setActive}>
                                        <ListItemIcon><MenuBook /></ListItemIcon>
                                        <ListItemText
                                            primary={journal.title}
                                            secondary={
                                                journal.journalbody &&
                                                journal.journalbody.substr(0, 50) + "..."} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge='end' aria-label="delete" onClick={() => deleteJournal(journal._id)}>
                                                <Delete />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                            )} />
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to='/' onClick={onClick}>
                            <ListItemIcon><ExitToApp /></ListItemIcon>
                            <ListItemText primary='Log Out' />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Main
                    activeJournal={activeJournal}
                    data={data}
                    setData={setData} />
            </main>
            <Instructions handleClose={handleClose} open={open} />
        </div>
    )
}

export default Sidebar;