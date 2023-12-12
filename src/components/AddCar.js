import React, { useState } from 'react';

const AddCar = () => {
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        fuelType: '',  // Updated to match the API expectation
        status: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/cars/addCar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carData),
            });

            if (!response.ok) {
                throw new Error('Failed to add car');
            }

            // on success alert and reset fields
            alert('Car added successfully!');
            setCarData({
                make: '',
                model: '',
                fuelType: '',
                status: '',
            });
        } catch (error) {
            console.error('Error adding car:', error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="title">Opret ny bil</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="make" className="subText">Make:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="make"
                        name="make"
                        value={carData.make}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="model" className="subText">Model:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="model"
                        name="model"
                        value={carData.model}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fuelType" className="subText">Fuel Type:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fuelType"
                        name="fuelType"
                        value={carData.fuelType}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="subText">Status:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        name="status"
                        value={carData.status}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Add Car</button>
            </form>
        </div>
    );
};

export default AddCar;