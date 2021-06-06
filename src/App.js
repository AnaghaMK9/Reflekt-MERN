import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Header from './components/Header.js';
import Home from './components/Home.js';
import ForgotPassword from './components/ForgotPassword.js';
import AlertState from './context/alert/AlertState.js';
import AuthState from './context/auth/AuthState.js';

import PrivateRoute from './components/PrivateRoute.js';
import ResetPassword from './components/ResetPassword.js';
import JournalState from './context/dashboard/JournalState.js';
import Dashboard from './components/dashboard/Dashboard.js';

const themeLight = createMuiTheme({
    typography: {
        fontFamily: [
            'Space Mono',
            'monospace',
        ].join(','),
    },
    palette: {
        background: {
            default: "#e4f0e2"
        },
        primary: {
            main: '#361B44'
        },
        secondary: {
            main: '#343334'
        }
    }
});

// const themeDark = createMuiTheme({
//     typography: {
//         fontFamily: [
//             'Space Mono',
//             'monospace',
//         ].join(','),
//     },
//     palette: {
//         background: {
//             default: "#222222"
//         },
//         primary: {
//             main: '#361B44'
//         },
//         secondary: {
//             main: '#343334'
//         },
//         text: {
//             primary: "#ffffff"
//         }
//     }
// });

function App() {
    return (
        <AuthState>
            <AlertState>
                <Router>
                    <ThemeProvider theme={themeLight}>
                        <div>
                            <Header />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/register' component={Register} />
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/password/forgot' component={ForgotPassword} />
                                <Route exact path='/password/reset' component={ResetPassword} />
                                <JournalState>
                                    <PrivateRoute exact path='/dashboard' component={Dashboard} />
                                </JournalState>
                                <Route component={
                                    () => (
                                        <h1>Not Found.
                                Go Back <Link to='/'>Home Page</Link>
                                        </h1>
                                    )
                                } />
                            </Switch>
                        </div>
                    </ThemeProvider>
                </Router>
            </AlertState>
        </AuthState>
    )
}

export default App;