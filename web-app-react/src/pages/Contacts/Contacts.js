// ContactPage.js

import React, { useState } from 'react';
import './Contacts.css';
const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // You can implement form submission to your backend or any other desired action
  };

  return (
    <div className="contact-container">
      <div className="main-content">
        <h1>Contact Us</h1>
        <p>
          Please use the form to get  in touch with us.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="side-note">
       <p>
          Sea Dragon Energy, Inc. is a majority- <br />
          owned subsidiary of Global Air <br />
          Logistics and Training, Inc., a veteran- <br />
          owned small business focused on <br />
          developing warfighter centric <br />
          solutions for command, control and <br />
          communications (C3) systems.

        </p>
        <div className="company-info">
          <h3>Corporate Address:</h3>
          <p>
            401 Strada Luca,
            <br />
            Florence, TX 76527
            <br />
            USA
          </p>
                    <h3>Email:</h3>
          <p>
            www.seadragon.energy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
