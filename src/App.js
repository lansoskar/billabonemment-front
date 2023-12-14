import React from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import Link from "react-router-dom";

//approuter contains actual routes and mounts components linked to url
//navbar is to well, navigate
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
                            <li><Link className="nav-link" to="/">Home </Link></li>
                            <li><Link className="nav-link" to="/addcar">Opret ny bil </Link></li>
                            <li><Link className="nav-link" to="/cars">Se alle biler </Link></li>
                            <li><Link className="nav-link" to="/makeOrder">Opret ny ordre </Link></li>
                            <li><Link className="nav-link" to="/reservations">Reservationer</Link></li>
                            <li><Link className="nav-link" to="/addCustomer">Opret kunde </Link></li>
                            <li><Link className="nav-link" to="/customers">Se alle kunder </Link></li>
                            <li><Link className="nav-link" to="/createDamageReport">Opret skade-rapport </Link></li>
                            <li><Link className="nav-link" to="/damageReports">Se alle skade-rapporter </Link></li>
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
