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
            <p>All vehicles, types, model, fuel and status</p>

            {/* Renders list of cars with carId as key, needs to do css to make look really cool */}
            <ul>
                {cars.map(car => (
                    <li key={car.carId}>
                        <p>Id: {car.carId}</p>
                        <p>Make: {car.make}</p>
                        <p>Model: {car.model}</p>
                        <p>Fueltype: {car.fuelType}</p>
                        <p>Status: {car.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default Cars;