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
            <h2 className="title">Opret ny Kunde i systemet</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="subText">Fuldt Navn:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={customerData.name}
                        onChange={handleInputChange}
                        placeholder="fx. Morten Jensen Pedersen"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="subText">Email:</label>
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
                    <label htmlFor="contactNumber" className="subText">Kontaktnummer:</label>
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
                    <label htmlFor="addressStreet" className="subText">Adresse:</label>
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
                    <label htmlFor="addressCity" className="subText">Postnummer:</label>
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
                    <label className="form-check-label" htmlFor="creditApproved">Kredit Godkendt</label>
                </div>

                <button type="submit" className="btn btn-primary">Tilføj kunde</button>
            </form>
        </div>
    );
};

export default AddCustomer;
