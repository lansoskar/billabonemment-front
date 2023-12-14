import React, {useState} from 'react';

const CreateAgreement = () => {
    const [agreementData, setAgreementData] = useState({
        customer_id: '',
        car_id: '',
        startDate: '',
        endDate: '',
        pickupLocation: '',
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
            const customerResponse = await fetch(`https://bilabonnementback.azurewebsites.net/api/customers/getCustomer/${agreementData.customer_id}`);
            if (!customerResponse.ok) {
                throw new Error('Failed to fetch customer details')
            }

            const customerData = await customerResponse.json();
            console.log(customerData)

            const customer = {...customerData, status: null};

            //fetch car details
            const carResponse = await fetch(`https://bilabonnementback.azurewebsites.net/api/cars/getCar/${agreementData.car_id}`);
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
                pickupLocation: agreementData.pickupLocation,
            };
            console.log(agreement)
            // Step 1: Check credit approval
            const creditCheckResponse = await fetch(`https://bilabonnementback.azurewebsites.net/api/customers/checkCredit/${agreementData.customer_id}`)

            if (!creditCheckResponse.ok) {
                throw new Error('Credit check failed. Lending agreement not created.');
            }

            // Step 2: Create lending agreement
            const response = await fetch('https://bilabonnementback.azurewebsites.net/api/lendingAgreements/createLendingAgreement', {
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
            const updateCarStatusResponse = await fetch(`https://bilabonnementback.azurewebsites.net/api/cars/updateCarStatus/${agreementData.car_id}`, {
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
            <h2 className="title">Opret ny Reservation i systemet</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="customer_id" className="subText">
                        Kunde ID:
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
                    <label htmlFor="car_id" className="subText">
                        Bil ID:
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
                    <label htmlFor="startDate" className="subText">
                        Start Dato:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        value={agreementData.startDate}
                        onChange={handleInputChange}
                        placeholder="YYYY-MM-DD"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="subText">
                        Slut Dato:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={agreementData.endDate}
                        onChange={handleInputChange}
                        placeholder="YYYY-MM-DD"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pickupLocation" className="subText">
                        Afhentningsadresse:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="pickupLocation"
                        name="pickupLocation"
                        value={agreementData.pickupLocation}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Opret Reservation
                </button>
            </form>
        </div>
    );
};

export default CreateAgreement;
