import React, { useContext } from 'react';
import AlertContext from '../context/alert/AlertContext.js';

function Alert() {
    const alertContext = useContext(AlertContext);
    return (
        alertContext.alerts.length > 0 &&
        alertContext.alerts.map((alert) => (
            <div key={alert.id}>
                <p style={{ color: alert.type, textAlign: 'center' }}> {alert.msg}</p>
            </div>
        ))
    )
}

export default Alert;