import React, { useEffect, useState } from 'react';
import {json} from "react-router-dom";

const Homepage = () => {
    // State to store fetched statistics
    const [statistics, setStatistics] = useState({
        reservations: 0,
        availableCars: 0,
        totalCars: 0,
        totalCarWorth: 0,
        totalCustomers: 0,
        totalDamageReports: 0,
        incompleteDamageReports: 0,
        remainingMaintenanceCost: 0,
        reservedCars: 0,
        maintenanceCars: 0,
    });

    useEffect(() => {
        // Fetch cars and reservations for statistics
        const fetchData = async () => {
            try {
                const [carsResponse, reservationsResponse, customersResponse, damageReportsResponse] = await Promise.all([
                    fetch('https://bilabonnementback.azurewebsites.net/api/cars'),
                    fetch('https://bilabonnementback.azurewebsites.net/api/lendingAgreements'),
                    fetch('https://bilabonnementback.azurewebsites.net/api/customers'),
                    fetch('https://bilabonnementback.azurewebsites.net/api/damageReports')
                ]);

                if (!carsResponse.ok) {
                    throw new Error('Failed to fetch cars');
                }

                const carsData = await carsResponse.json();

                // Calculate the total car worth
                const totalCarWorth = carsData.reduce((sum, car) => sum + car.carValue, 0);

                // Get total number of cars
                const totalCars = carsData.length;

                // Get number of reserved cars
                const reservedCars = carsData.filter(car => car.status === 'Reserved').length;

                const maintenanceCars = carsData.filter(car => car.status === 'Maintenance').length;

                // Get number of available cars
                const availableCars = carsData.filter(car => car.status === 'Available').length;

                // Update reservations state variable
                const reservationsData = await reservationsResponse.json();
                const reservations = reservationsData.length;
                const customerData = await customersResponse.json();
                const damageReportData = await damageReportsResponse.json();

                //total customers
                const totalCustomers = customerData.length

                //total damage reports
                const totalDamageReports = damageReportData.length

                //get damage reports where repair is not completed
                const incompleteDamageReports = damageReportData.filter(damageReport => !damageReport.repairComplete).length

                //get remaining maintenance cost
                const remainingMaintenanceCost = damageReportData.reduce((sum, damageReport) => {
                    // Check if repairComplete is false before adding to the sum
                    if (!damageReport.repairComplete) {
                        return sum + damageReport.repairCost;
                    }
                    return sum;
                }, 0);

                // Update statistics state variables
                setStatistics({
                    ...statistics,
                    totalCars: totalCars,
                    availableCars: availableCars,
                    totalCarWorth: totalCarWorth,
                    reservedCars: reservedCars,
                    maintenanceCars: maintenanceCars,
                    reservations: reservations,
                    totalCustomers: totalCustomers,
                    totalDamageReports: totalDamageReports,
                    incompleteDamageReports: incompleteDamageReports,
                    remainingMaintenanceCost: remainingMaintenanceCost,
                });
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []); // Empty dependency array to fetch data only once on mount

    // Calculate the percentage of available cars
    const percentageAvailable = (statistics.availableCars / statistics.totalCars) * 100;

    // Calculate the percentage of reserved cars
    const percentageReserved = (statistics.reservedCars / statistics.totalCars) * 100;

    // Define styles for the Available Cars and Reserved Cars cards based on the percentages
    const availableCarsCardStyle = {
        border: percentageAvailable <= 20 ? '4px solid red' : '2px solid #ced4da',
    };

    const reservedCarsCardStyle = {
        border: percentageReserved >= 70 ? '4px solid green' : '2px solid #ced4da',
    };

    return (
        <div className="container mt-4">
            {/* Car statistics */}
            <h2 className="title">Bil-Statistik</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">

                {/* Available Cars Statistics */}
                <div className="col">
                    <div className="card shadow" style={availableCarsCardStyle}>
                        <div className="card-body">
                            <h5 className="card-title">Frie Biler</h5>
                            <p className="card-text">{statistics.availableCars}</p>
                            {percentageAvailable <= 20 && <p className="text-danger"> Lav mængde af frie biler!</p>}
                        </div>
                    </div>
                </div>

                {/* Reserved Cars Statistics */}
                <div className="col">
                    <div className="card shadow" style={reservedCarsCardStyle}>
                        <div className="card-body">
                            <h5 className="card-title">Reserverede Biler</h5>
                            <p className="card-text">{statistics.reservedCars}</p>
                            {percentageReserved >= 70 && <p className="text-success"> Størstedelen af biler er reserveret!</p>}
                        </div>
                    </div>
                </div>

                {/* Maintenance Cars Statistics */}
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Biler under reparation</h5>
                            <p className="card-text">{statistics.maintenanceCars}</p>
                        </div>
                    </div>
                </div>

                {/* Total Cars Statistics */}
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Mængde af Biler</h5>
                            <p className="card-text">{statistics.totalCars}</p>
                        </div>
                    </div>
                </div>

                {/* Total Car Worth Statistics */}
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Samlet Bil-værdi</h5>
                            <p className="card-text">{statistics.totalCarWorth.toLocaleString('de-DE', { useGrouping: true })} kr.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reservation statistics */}
            <h2 className="title">Reservationsinformation</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Mængde af Reservationer</h5>
                            <p className="card-text">{statistics.reservations}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Damage Report statistics */}
            <h2 className="title">Skade-rapports information</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {/* Total Damage Reports */}
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Mængde af Skaderapporter</h5>
                            <p className="card-text">{statistics.totalDamageReports}</p>
                        </div>
                    </div>
                </div>

                {/* Damage Reports Incomplete Repair */}
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Rapporter uden afsluttet reparation</h5>
                            <p className="card-text">{statistics.incompleteDamageReports}</p>
                        </div>
                    </div>
                </div>

                {/* Remaining Maintenance Costs */}
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Resterende reparationsomkostninger</h5>
                            <p className="card-text">{statistics.remainingMaintenanceCost.toLocaleString('de-DE', { useGrouping: true })} kr.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer information */}
            <h2 className="title">Kunde information</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {/* Total Customers */}
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">Total mængde Kunder</h5>
                            <p className="card-text">{statistics.totalCustomers}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
