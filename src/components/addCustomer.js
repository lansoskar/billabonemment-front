import React, { useState } from 'react';

const AddCustomer = () => {
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        addressStreet: '',
        addressCity: '',
        creditApproved: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/addCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });

            if (!response.ok) {
                throw new Error('Failed to add customer');
            }
            // alert and clear fields on success
            alert('Customer added successfully!');
            setCustomerData({
                name: "",
                email: "",
                contactNumber: "",
                addressStreet: "",
                addressCity: "",
                creditApproved: false,
            });
        } catch (error) {
            console.error('Error adding customer:', error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="title">Add a New Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={customerData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={customerData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">Contact Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactNumber"
                        name="contactNumber"
                        value={customerData.contactNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="addressStreet" className="form-label">Street:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="addressStreet"
                        name="addressStreet"
                        value={customerData.addressStreet}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="addressCity" className="form-label">City:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="addressCity"
                        name="addressCity"
                        value={customerData.addressCity}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="creditApproved"
                        name="creditApproved"
                        checked={customerData.creditApproved}
                        onChange={() => setCustomerData({ ...customerData, creditApproved: !customerData.creditApproved })}
                    />
                    <label className="form-check-label" htmlFor="creditApproved">Credit Approved</label>
                </div>

                <button type="submit" className="btn btn-primary">Add Customer</button>
            </form>
        </div>
    );
};

export default AddCustomer;
