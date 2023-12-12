import React, { useEffect, useState } from 'react';

const SeeReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // Fetch all lending agreements when the component mounts
        const fetchReservations = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/lendingAgreements');
                if (!response.ok) {
                    throw new Error('Failed to fetch lending agreements');
                }

                const data = await response.json();
                setReservations(data);
            } catch (error) {
                console.error('Error fetching lending agreements:', error.message);
            }
        };

        fetchReservations();
    }, []); // Empty dependency array to run the effect only once

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Reservations</h2>
            <table className="table shadow">
                <thead>
                <tr>
                    <th>Lending Agreement ID</th>
                    <th>Car ID</th>
                    <th>Customer ID</th>
                    <th>Afhentningsted</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
                </thead>
                <tbody>
                {reservations.map((reservation) => (
                    <tr key={reservation.lendingAgreementId}>
                        <td>{reservation.lendingAgreementId}</td>
                        <td>{reservation.car.carId}</td>
                        <td>{reservation.customer.customerId}</td>
                        <td>{reservation.pickupLocation}</td>
                        <td>{reservation.startDate}</td>
                        <td>{reservation.endDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeeReservations;