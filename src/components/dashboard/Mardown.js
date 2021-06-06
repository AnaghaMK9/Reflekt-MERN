import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650,
        maxWidth: 0,
        margin: '0 auto',
        border: '1px solid #ccc'
    },
}));

function createData(name, cheats) {
    return { name, cheats };
}

const rows = [
    createData('Headers', ['# H1', '## H2', '### H3']),
    createData('Bold', ['**bold**']),
    createData('Italic', ['*italic*']),
    createData('Blockquote', ['>blockquote']),
    createData('Ordered List', ['1. First', '2. Second', '3. Third']),
    createData('Unordered List', ['- First', '- Second', '- Third']),
    createData('Code', ['`write your code here`']),
    createData('Link', ['[title](https://example.com)']),
    createData('Fenced Code Block', ["```{'name':'Name', \n'lname':'Last Name'}```"]),
    createData('Strikethrough', ['~~This is strikethrough syntax~~'])
];

export default function Markdown() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead >
                    <TableRow>
                        <TableCell>Elements</TableCell>
                        <TableCell align="left">Markdown Syntax</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <>
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" rowSpan={row.cheats.length + 1}>
                                    {row.name}
                                </TableCell>
                            </TableRow>
                            {row.cheats.map(cheat => (
                                <TableRow>
                                    <TableCell>{cheat}</TableCell>
                                </TableRow>
                            ))}
                        </>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}