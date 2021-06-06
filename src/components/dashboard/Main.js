import { Box, TextField, Typography, Button } from '@material-ui/core';
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
    const { journals, updateJournal } = journalContext;

    const [current, setCurrent] = useState({});

    const onEdit = (field, value) => {

        setCurrent({
            ...current,
            [field]: value
        });
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
        updateJournal(current._id, current.title, current.journalbody);
    }
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
                <TextField
                    id='title'
                    name='title'
                    label="Title"
                    fullWidth
                    margin='normal'
                    variant='filled'
                    className={classes.title}
                    value={current.title}
                    onChange={(e) => onEdit('title', e.target.value)}
                />
                <TextField
                    id='journalbody'
                    label="Journal"
                    name='journalbody'
                    placeholder="Start writing"
                    multiline
                    rows={6}
                    rowsMax={6}
                    fullWidth
                    margin='normal'
                    variant='filled'
                    className={classes.title}
                    value={current.journalbody}
                    onChange={(e) => onEdit('journalbody', e.target.value)} />
            </div>
            <Button onClick={save} backgroundColor='primary'>Save</Button>
            <div>
                <Typography variant='h5'>
                    {current.title}
                </Typography>
                <Box component='div'
                    display='block'
                    rows={6}
                    rowsMax={6}
                    multiline>
                    <ReactMarkdown>
                        {current.journalbody}
                    </ReactMarkdown>
                </Box>
            </div>
        </div>
    )
}
export default Main;