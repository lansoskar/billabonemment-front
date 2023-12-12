import React, {useState} from 'react';

const CreateAgreement = () => {
    const [agreementData, setAgreementData] = useState({
        customer_id: '',
        car_id: '',
        startDate: '',
        endDate: '',
    });


    const handleInputChange = (e) => {
        const {name, value} = e.target;

        // Converts input value to long if named customer_id or car_id
        const convertedValue = (name === 'customer_id' || name === 'car_id') ? Number(value) : value;

        setAgreementData(prevState => ({
            ...prevState,
            [name]: convertedValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // fetch customer detail
            const customerResponse = await fetch(`http://localhost:8080/api/customers/getCustomer/${agreementData.customer_id}`);
            if (!customerResponse.ok) {
                throw new Error('Failed to fetch customer details')
            }

            const customerData = await customerResponse.json();
            console.log(customerData)

            const customer = {...customerData, status: null};

            //fetch car details
            const carResponse = await fetch(`http://localhost:8080/api/cars/getCar/${agreementData.car_id}`);
            if (!carResponse.ok) {
                throw new Error('Failed to fetch car details')
            }

            const carData = await carResponse.json();
            console.log(carData)

            const car = {...carData, status: null};
            //agreement object
            const agreement = {
                customer: customerData,
                car: carData,
                startDate: agreementData.startDate,
                endDate: agreementData.endDate,
            };
            console.log(agreement)
            // Step 1: Check credit approval
            const creditCheckResponse = await fetch(`http://localhost:8080/api/customers/checkCredit/${agreementData.customer_id}`)

            if (!creditCheckResponse.ok) {
                throw new Error('Credit check failed. Lending agreement not created.');
            }

            // Step 2: Create lending agreement
            const response = await fetch('http://localhost:8080/api/lendingAgreement/createLendingAgreement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agreement),
            });

            if (!response.ok) {
                throw new Error('Failed to create lending agreement');
            }

            // Step 3: Update car status
            const updateCarStatusResponse = await fetch(`http://localhost:8080/api/cars/updateCarStatus/${agreementData.car_id}`, {
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
                    <label htmlFor="customer_id" className="form-label">
                        Customer ID:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="customer_id"
                        name="customer_id"
                        value={agreementData.customer_id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="car_id" className="form-label">
                        Car ID:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="car_id"
                        name="car_id"
                        value={agreementData.car_id}
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
