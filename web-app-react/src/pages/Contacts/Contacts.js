// ContactPage.js

import React, { useState } from 'react';
import './Contacts.css';
import emailjs  from 'emailjs-com';

const publicKey = "u9iMG1UvbcLRW0x73";
const serviceID = "service_t8fct18";
const templateID = "template_nj6s87n";

emailjs.init(publicKey);

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
    console.log('Form submitted!', formData);
    const inputFields = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, inputFields)
      .then(() => {
        console.log('Email sent successfully!');
        // Add any success handling code here
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        // Add error handling code here
      });
  };

  return (
    <div className="contact-container">
      <div className="main-content">
        <h1>Contact Us</h1>
        <h2>Please use the form to get in touch with us.</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button className='submitButton' type="submit">Submit</button>
        </form>
      </div>
      <div className="side-note">
        <h2>About Our Company</h2>
        <p className='aboutText'>
          Sea Dragon Energy, Inc. is a majority-owned subsidiary of Global Air Logistics and Training, Inc., a veteran-owned small business focused on developing warfighter-centric solutions for command, control, and communications (C3) systems.
        </p>
        <div className="company-info">
          <h3>Corporate Address:</h3>
          <p>
            401 Strada Luca,
            <br />
            Florence, TX 76527
            <br />
            USA
            <br />
          </p>
          <p className='sdeiLink' >
            <a href='https://www.seadragon.energy/'>www.seadragon.energy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
