import React, {useState, useEffect} from 'react';


const Cars = () => {
            //state variable to hold cars and update cars
        const [cars, setCars] = useState([])
            //fetch all cars
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cars');

                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }

                const carsData = await response.json();
                setCars(carsData);
            } catch (error) {
                console.error('Error fetching cars:', error.message);
            }
        };
        console.log(cars)
        fetchCars();
    }, []);

    return (
        <div>
            <p className="title">All Vehicles</p>
            <p className="subText">All vehicles, types, model, fuel, and status</p>

            {/* Bootstrap table with color-coded borders from switch */}
            <table className="table shadow">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Fuel Type</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {cars.map((car) => (
                    <tr key={car.carId} className={`table-${getStatusColorClass(car.status)}`}>
                        <td>{car.carId}</td>
                        <td>{car.make}</td>
                        <td>{car.model}</td>
                        <td>{car.fuelType}</td>
                        <td>{car.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// Function to determine the Bootstrap class based on status
const getStatusColorClass = (status) => {
    switch (status) {
        case 'Available':
            return 'success';
        case 'In Use':
            return 'warning';
        case 'Maintenance':
            return 'danger';
        default:
            return 'dark'; // default
    }
};

export default Cars;