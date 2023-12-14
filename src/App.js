import React from 'react';
import './App.css';
import AppRouter from './components/AppRouter';


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
                            <li><a className="nav-link" href="http://billabonnement-front.onrender.com">Home </a></li>
                            <li><a className="nav-link" href="http://billabonnement-front.onrender.com/addcar">Opret ny bil </a></li>
                            <li><a className="nav-link" href="http://billabonnement-front.onrender.com/cars">Se alle biler </a></li>
                            <li><a className="nav-link" href="http://billabonnement-front.onrender.com/makeorder">Opret ny ordre </a></li>
                            <li><a className="nav-link" href="http://billabonnement-front.onrender.com/reservations">Reservationer</a></li>
                            <li><a className="nav-link" href="http://billabonnement-front.onrender.com/addCustomer">Opret kunde </a></li>
                            <li><a className="nav-link" href="http://billabonnement-front.onrender.com/customers">Se alle kunder </a></li>
                            <li><a className="nav-link" href="http://billabonnement-front.onrender.com/createDamageReport">Opret skade-rapport </a></li>
                            <li><a className="nav-link" href="http://billabonnement-front.onrender.com/damageReports">Se alle skade-rapporter </a></li>
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
