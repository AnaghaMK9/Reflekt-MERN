import React, { useContext } from 'react';
import Alert from '../Alert';
import Sidebar from './Sidebar';
import JournalContext from '../../context/dashboard/JournalContext.js';
import Loading from '../Loading';

function Dashboard() {
    const journalContext = useContext(JournalContext);
    const { loading } = journalContext;

    return (
        <div>
            {loading && <Loading />}
            <Alert />
            <Sidebar />
        </div>
    )
}

export default Dashboard
