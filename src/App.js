import React from 'react';
import './App.css';
import AppRouter from './components/AppRouter';


//approuter contains actual routes and mounts components linked to url
//navbar is to well, navigate
function App() {
    return (
        <div className="App">
            <header className="horizontal-header">
                <p className="title">Bilabonnement</p>
            </header>
            <div className="main-container">
                <header className="vertical-header">
                    <nav className="navbar navbar-light bg-light">
                        <ul className='nav-list'>
                            <p className="navbarTitle">Oversigt</p>
                            <li><a className="nav-link" href="http://localhost:3000">Home </a></li>
                            <li><a className="nav-link" href="http://localhost:3000/cars">Se alle biler </a></li>
                            <li><a className="nav-link" href="http://localhost:3000/addcar">Tilføj bil </a></li>
                            <li><a className="nav-link" href="http://localhost:3000/makeorder">Make Order </a></li>
                            <li><a className="nav-link" href="http://localhost:3000/customers">Kunder </a></li>
                            <li><a className="nav-link" href="http://localhost:3000/addCustomer">Tilføj kunde </a></li>
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
