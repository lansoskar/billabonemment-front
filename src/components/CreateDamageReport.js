import React, {useState} from 'react';

const CreateDamageReport = () => {
    const [damageReportData, setDamageReportData] = useState({
        typeOfDamage: '',
        repairCost: '',
        carId: '',
        lendingAgreementId: '',
        repairComplete: false,
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        // Converts input value to number if named carId or lendingAgreementId
        const convertedValue = (name === 'carId' || name === 'lendingAgreementId') ? Number(value) : value;

        setDamageReportData((prevData) => ({
            ...prevData,
            [name]: convertedValue,
        }));
    };

    // Creates the correct object and stores in database, get bad json and doesnt get complete alert
    const handleSubmit = async (e) => {
        e.preventDefault();

        //fetch lending agreement details
        const lendingResponse = await fetch(`http://localhost:8080/api/lendingAgreements/getLendingAgreement/${damageReportData.lendingAgreementId}`)
        if (!lendingResponse.ok) {
            throw new Error("Failed to fetch Lending Agreement details")
        }
        const lendingData = await lendingResponse.json();
        console.log(lendingData)

        const lendingAgreement = {...lendingData, status: null};

        //fetch car details
        const carResponse = await fetch(`http://localhost:8080/api/cars/getCar/${damageReportData.carId}`);
        if (!carResponse.ok) {
            throw new Error('Failed to fetch car details')
        }

        const carData = await carResponse.json();
        console.log(carData)

        const car = {...carData, status: null};

        const report = {
            typeOfDamage: damageReportData.typeOfDamage,
            repairCost: damageReportData.repairCost,
            car: carData,
            lendingAgreement: lendingData,
            repairComplete: false,
        }

        try {
            const response = await fetch('http://localhost:8080/api/damageReport/createDamageReport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(report),
            });

            if (!response.ok) {
                throw new Error('Failed to create damage report');
            }


            console.log(report)

            // for some reason it goes through and saves properly in the database and logs out the new damage report-
            //- in the backend, however there is still an "is not valid json error"
            alert('Damage report created successfully!');
        } catch (error) {
            console.error('Error creating damage report:', error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Create Damage Report</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="typeOfDamage" className="form-label">
                        Type of Damage:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="typeOfDamage"
                        name="typeOfDamage"
                        value={damageReportData.typeOfDamage}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="repairCost" className="form-label">
                        Repair Cost:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="repairCost"
                        name="repairCost"
                        value={damageReportData.repairCost}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="carId" className="form-label">
                        Car ID:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="carId"
                        name="carId"
                        value={damageReportData.carId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lendingAgreementId" className="form-label">
                        Lending Agreement ID:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="lendingAgreementId"
                        name="lendingAgreementId"
                        value={damageReportData.lendingAgreementId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Damage Report
                </button>
            </form>
        </div>
    );
};

export default CreateDamageReport;
