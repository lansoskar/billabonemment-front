import React from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import Link from "react-router-dom";

//approuter contains actual routes and mounts components linked to url
function App() {
    return (
        <div className="App">
            <header className="horizontal-header">
                <p className="title2">Bilabonnement</p>
            </header>
            <div className="main-container">
                <header className="vertical-header">
                    <nav className="navbar navbar-light bg-light">
                        <ul className='nav-list'>
                            <p className="navbarTitle">Oversigt</p>
                            <li><a className="nav-link" href="/">Home </a></li>
                            <li><a className="nav-link" href="/addcar">Opret ny bil </a></li>
                            <li><a className="nav-link" href="/cars">Se alle biler </a></li>
                            <li><a className="nav-link" href="/makeOrder">Opret ny ordre </a></li>
                            <li><a className="nav-link" href="/reservations">Reservationer</a></li>
                            <li><a className="nav-link" href="/addCustomer">Opret kunde </a></li>
                            <li><a className="nav-link" href="/customers">Se alle kunder </a></li>
                            <li><a className="nav-link" href="/createDamageReport">Opret skade-rapport </a></li>
                            <li><a className="nav-link" href="/damageReports">Se alle skade-rapporter </a></li>
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
