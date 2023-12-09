import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './Homepage';
import Cars from './Cars';
import CreateAgreement from './CreateAgreement';

// BrowserRouter with routes, notice homepage being well, the home page at the root
const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/cars" element={<Cars />} />
                    <Route path="/MakeOrder" element={<CreateAgreement />} />
                </Routes>
            </Router>
        </>
    );
};

export default AppRouter;