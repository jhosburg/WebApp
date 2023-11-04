import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contacts.css';


const Contacts = () => {
  return (
    <Container className="contact-container">
      <Row>
        <Col lg={6} className="info-section">
          <div className="company-info">
            <h2>Sea Dragon Understands the Needs of California</h2>
            
            <strong>Email:</strong> <a href="mailto:www.seadragon.energy">www.seadragon.energy</a>
            <address>
              <strong>Corporate Address:</strong><br />
              401 Strada Luca<br />
              Florence, TX 76527<br />
              USA
            </address>
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
      </Row>
    </Container>
  );
};

export default Contacts;
