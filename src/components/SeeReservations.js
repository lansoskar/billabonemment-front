import React, { useEffect, useState } from 'react';

const SeeReservations = () => {
    const [lendingAgreements, setLendingAgreements] = useState([]);

    useEffect(() => {
        const fetchLendingAgreements = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/lendingAgreements', {
                    headers: {
                        'Access-Contol-Allow-Origin': '*',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch lending agreements');
                }

                const lendingAgreementsData = await response.json();
                setLendingAgreements(lendingAgreementsData);
            } catch (error) {
                console.error('Error fetching lending agreements:', error.message);
            }
        };

        fetchLendingAgreements();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">All Lending Agreements</h2>

            <table className="table shadow">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Customer id</th>
                    <th>Car id</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
                </thead>
                <tbody>
                {lendingAgreements.map((agreement) => (
                    <tr key={agreement.lendingAgreementId}>
                        <td>{agreement.lendingAgreementId}</td>
                        <td>{agreement.customer_id}</td>
                        <td>{agreement.car_id}</td>
                        <td>{agreement.startDate}</td>
                        <td>{agreement.endDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeeReservations;
