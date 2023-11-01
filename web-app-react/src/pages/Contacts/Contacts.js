import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contacts.css';
import mpower from './mPower.png';

const Contacts = () => {
  return (
    <Container className="contact-container">
      <Row>
        <Col lg={6} className="info-section">
          <div className="company-info">
            <h2>Company Information</h2>
            <p>
              Sea Dragon Energy Inc. understands the needs of California.
            </p>
            <strong>Email:</strong> <a href="mailto:www.seadragon.energy">www.seadragon.energy</a>
            
            {/* Corporate Address */}
            <address>
              <strong>Corporate Address:</strong><br />
              401 Strada Luca<br />
              Florence, TX 76527<br />
              USA
            </address>

            {/* Additional company information */}
            <p>
              We are dedicated to providing innovative solutions for energy management and sustainability.
            </p>
            <p>
              Our mission is to empower individuals and businesses to reduce their energy consumption and carbon footprint.
            </p>
          </div>
          <div className="contact-form">
            <h2>Contact Us</h2>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Message" />
              </Form.Group>
              <Button className="btn ac_btn" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col lg={6} className="image-section">
          <div className="text-center">
            <img
              src={mpower}
              alt="Image Description"
              style={{ width: '70%', height: 'auto' }}
            />
            <p className="image-description">
              The mPower allows users to manage their energy consumption at less cost.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacts;
