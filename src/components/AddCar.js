import React, { useState } from 'react';

const AddCar = () => {
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        fuelType: '',
        status: '',
        carValue: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://bilabonnementback.azurewebsites.net/api/cars/addCar', {
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
                carValue: '',
            });
        } catch (error) {
            console.error('Error adding car:', error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="title">Opret ny bil i systemet</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="make" className="subText">Mærke:</label>
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
                    <label htmlFor="fuelType" className="subText">Brændstofstype:</label>
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
                        placeholder="Available / Reserved / Maintenance"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="carValue" className="subText">Bil værdi:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="carValue"
                        name="carValue"
                        value={carData.carValue}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Tilføj Bil</button>
            </form>
        </div>
    );
};

export default AddCar;