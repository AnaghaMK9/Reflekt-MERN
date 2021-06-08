import { Box, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import JournalContext from '../../context/dashboard/JournalContext.js';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: 'white'
    }
}))

function Main({ activeJournal, data, setData, journal }) {
    const journalContext = useContext(JournalContext);
    const { journals, updateJournal, loading } = journalContext;

    const [current, setCurrent] = useState({});
    let timer = null;
    const onEdit = (field, value) => {

        setCurrent({
            ...current,
            [field]: value
        });
        localStorage.setItem('current', JSON.stringify(current));
    }
    useEffect(() => {
        if (activeJournal) {
            const journal = getActiveJournal();
            setCurrent(journal);
        }
        // eslint-disable-next-line
    }, [activeJournal]);

    const getActiveJournal = () => {
        const journal = journals.find((journal) => journal._id === activeJournal);
        return journal;
    };

    const save = () => {
        let currentLocal = JSON.parse(localStorage.getItem('current'));
        updateJournal(currentLocal._id, currentLocal.title, currentLocal.journalbody);
    }

    const autosave = () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(save, 5000);
    }
    //setTimeout(save, 10000);

    const classes = useStyles();
    if (journals.length === 0) {
        return (
            <div>
                <Box component='div' display='block'>
                    <Typography variant='h5'>
                        Add a journal Entry
                </Typography>
                </Box>
            </div>
        )
    }
    else if (!activeJournal) {
        return (
            <div>
                <Box component='div' display='block'>
                    <Typography variant='h5'>
                        Select a journal Entry
                </Typography>
                </Box>
            </div>
        )
    }
    return (
        <div>
            <div>
                <form>
                    <div style={{ marginLeft: '3px' }}>{loading ? 'Saving...' : 'Saved'}</div>

                    <TextField
                        id='title'
                        name='title'
                        label="Title"
                        type='text'
                        fullWidth
                        margin='normal'
                        variant='filled'
                        className={classes.title}
                        onChange={(e) => onEdit('title', e.target.value)}
                        value={current.title}
                        onKeyUp={autosave}
                    />
                    <TextField
                        id='journalbody'
                        label="Journal"
                        name='journalbody'
                        type='text'
                        placeholder="Start writing"
                        multiline
                        rows={6}
                        rowsmax={6}
                        fullWidth
                        margin='normal'
                        variant='filled'
                        className={classes.title}
                        onChange={(e) => onEdit('journalbody', e.target.value)}
                        value={current.journalbody}
                        onKeyUp={autosave} />
                </form>
                <Typography variant='h5'>
                    {current.title}
                </Typography>
                <Box component='div'
                    display='block'
                    rows={6}
                    rowsmax={6}
                    multiline='true'>
                    <ReactMarkdown>
                        {current.journalbody}
                    </ReactMarkdown>
                </Box>
            </div>
        </div>
    )
}
export default Main;