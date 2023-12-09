import React from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import logo from './src/bilabonnementlogo.svg';

//approuter contains actual routes and mounts components linked to url
//navbar is to well, navigate
function App() {
    return (
        <div className="App">
            <header className="horizontal-header">
                <img src={"logo"} alt="Bilabonnement Logo"/><p>headertest</p>
            </header>
            <div className="main-container">
                <header className="vertical-header">
                    <nav className="navbar navbar-light bg-light">
                        <ul className='nav-list'>
                            <li><a className="nav-link" href="http://localhost:3000">Home </a></li>
                            <li><a className="nav-link" href="http://localhost:3000/cars">Biler </a></li>
                            <li><a className="nav-link" href="http://localhost:3000/makeorder">Make Order </a></li>
                        </ul>
                    </nav>
                </header>
                <div className="main-content">
                    <AppRouter/>
                </div>
            </div>
        </div>
    );
}

export default App;
