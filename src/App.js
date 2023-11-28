import React from 'react';
import './App.css';

import AppRouter from './components/AppRouter';

//approuter contains actual routes and mounts components linked to url
//navbar is to well, navigate
function App() {
    return (
        <div className="App">


            <ul id='nav-list'>
                <li><a href="http://localhost:3000">Home </a></li>
                <li><a href="http://localhost:3000/browse">Browse </a></li>
                <li><a href="http://localhost:3000/makeorder">Make Order </a></li>
            </ul>

            <AppRouter/>
        </div>
    );
}

export default App;
