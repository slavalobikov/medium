import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'


import Routes from './routes'
import TopBar from "./Components/TopBar/TopBar";
import {CurrentUserProvider} from "./context/currentUser";
import CurrentUserChecker from "./Components/CurrentUserChecker/CurrentUserChecker";


const App = () => {
    return (
        <CurrentUserProvider>
            <CurrentUserChecker>
                <Router>
                    <TopBar/>
                    <Routes/>
                </Router>
            </CurrentUserChecker>
        </CurrentUserProvider>
    )
};

ReactDOM.render(
    <App/>
    , document.getElementById('root')
);


