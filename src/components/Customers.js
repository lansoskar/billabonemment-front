import React, {useEffect, useState} from 'react';

const Customers = () => {
    //state variable to hold customers and update customers
    const [customers, setCustomers] = useState([])
    //fetch all customers
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('https://bilabonnementback.azurewebsites.net/api/customers');

                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }

                const customersData = await response.json();
                setCustomers(customersData);
            } catch (error) {
                console.error('Error fetching customers:', error.message);
            }
        };
        console.log(customers)
        fetchCustomers();
    }, []);

    return (
        <div>
            <p className="title">Alle kunder</p>
            <p className="subText">Alle kunder og deres navn, email, kontact nummer, addresse, postnummer og hvis deres credit is approved</p>

            <table className="table shadow">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Street</th>
                    <th>Zipcode</th>
                    <th>Credit Approved</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.customerId} >
                        <td>{customer.customerId}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.contactNumber}</td>
                        <td>{customer.addressStreet}</td>
                        <td>{customer.addressCity}</td>
                        <td>{customer.creditApproved ? "Yes" : "No"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;
