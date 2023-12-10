import React, { useState } from 'react';

const CreateAgreement = () => {
    const [agreementData, setAgreementData] = useState({
        customerId: '',
        carId: '',
        startDate: '',
        endDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAgreementData({ ...agreementData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Check credit approval
            const creditCheckResponse = await fetch(`http://localhost:8080/api/customers/checkCredit/${agreementData.customerId}`,
                {

                });

            if (!creditCheckResponse.ok) {
                throw new Error('Credit check failed. Lending agreement not created.');
            }

            // Step 2: Create lending agreement
            const response = await fetch('http://localhost:8080/api/createLendingAgreement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agreementData),
            });

            if (!response.ok) {
                throw new Error('Failed to create lending agreement');
            }

            // Step 3: Update car status
            const updateCarStatusResponse = await fetch(`http://localhost:8080/api/cars/updateCarStatus/${agreementData.carId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!updateCarStatusResponse.ok) {
                throw new Error('Failed to update car status. Please check manually.');
            }

            //if successfully, create alert
            alert('Lending agreement created successfully!');
            console.log(agreementData)
        } catch (error) {
            console.error('Error creating lending agreement:', error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Create Lending Agreement</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="customerId" className="form-label">
                        Customer ID:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="customerId"
                        name="customerId"
                        value={agreementData.customerId}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="carId" className="form-label">
                        Car ID:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="carId"
                        name="carId"
                        value={agreementData.carId}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                        Start Date:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        value={agreementData.startDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                        End Date:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={agreementData.endDate}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create Lending Agreement
                </button>
            </form>
        </div>
    );
};

export default CreateAgreement;
