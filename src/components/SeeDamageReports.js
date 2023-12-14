import React, { useState, useEffect } from 'react';

const SeeDamageReports = () => {
    const [damageReports, setDamageReports] = useState([]);

    useEffect(() => {
        // Fetch all damage reports when the component mounts
        const fetchDamageReports = async () => {
            try {
                const response = await fetch('https://bilabonnementback.azurewebsites.net/api/damageReports');
                if (!response.ok) {
                    throw new Error('Failed to fetch damage reports');
                }

                const data = await response.json();
                setDamageReports(data);
            } catch (error) {
                console.error('Error fetching damage reports:', error.message);
            }
        };

        fetchDamageReports();
    }, []); // Empty dependency array to run only once when it mounts

    //when button is pressed set car associated with damagereport as available and set repair complete to true
    const handleButtonPress = async (reportId, carId, repairComplete) => {
        try {
            const numericReportId = Number(reportId);
            const numericCarId = Number(carId);

            const carResponse = await fetch(`https://bilabonnementback.azurewebsites.net/api/cars/setCarAvailable/${numericCarId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ repairComplete }), // Set repairComplete value directly
            });

            if (!carResponse.ok) {
                throw new Error('Failed to update car status');
            }

            const damageReportResponse = await fetch(`https://bilabonnementback.azurewebsites.net/api/damageReports/updateRepairComplete/${numericReportId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ repairComplete }), // Set repairComplete value directly
            });

            if (!damageReportResponse.ok) {
                throw new Error('Failed to update damage report');
            }

            // If the update was successful, fetch the updated list of damage reports
            const updatedReports = await fetch('https://bilabonnementback.azurewebsites.net/api/damageReports');
            const updatedData = await updatedReports.json();
            setDamageReports(updatedData);
        } catch (error) {
            console.error('Error updating repairComplete:', error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="title">Alle skade-rapporter</h2>
            <p className="subText">Skaderapporter, herunder; skade-rapport id, bil id, reservations id, type af skade, kost af reperation, er reperation færdig?</p>
            <table className="table shadow">
                <thead>
                <tr>
                    <th>Rap. ID</th>
                    <th>Bil ID</th>
                    <th>Res. ID</th>
                    <th>Skadetype</th>
                    <th>Reparationsomkostninger (kr.)</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {damageReports.map((report) => (
                    <tr key={report.damageReportId} style={{ backgroundColor: report.repairComplete ? 'black' : 'white' }}>
                        <td>{report.damageReportId}</td>
                        <td>{report.car.carId}</td>
                        <td>{report.lendingAgreement.lendingAgreementId}</td>
                        <td>{report.typeOfDamage}</td>
                        <td>{report.repairCost}</td>
                        <td>
                            <button
                                className={report.repairComplete ? 'btn btn-secondary' : 'btn btn-primary'}
                                onClick={() => handleButtonPress(report.damageReportId, report.car.carId, !report.repairComplete)}
                            >
                                {report.repairComplete ? 'Færdiggjort' : 'Marker Færdig'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeeDamageReports;
