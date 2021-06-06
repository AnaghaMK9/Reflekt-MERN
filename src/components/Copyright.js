import React from 'react';
import { Typography, Link } from '@material-ui/core';

function Copyright() {
    return (
        <div>
            <Typography variant='body2' color='textSecondary' align='center'>
                {'Copyright ©'}
                <Link color='inherit' href='https://material-ui.com/'>
                    Reflekt Journal
                </Link>{'  '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
}

export default Copyright;