import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contacts.css';



const Contacts = () => {
  return (
    <Container className="contact-container">
      <Row>
        <Col lg={6} className="info-section">
          <div className="company-info">
            <h2>Corporate Address</h2>
            <address>
              401 Strada Luca<br />
              Florence, TX 76527<br />
              USA
            </address>
            <strong>Email:</strong> <a href="mailto:www.seadragon.energy">www.seadragon.energy</a>
            <p>
              Sea Dragon Energy, Inc. is a majority owned subsidiary of global Air logistics
              and training, Inc., a veteran-owned small business focused on developing warfighter centric
              solutions for command, control and communications (C3) systems.
            </p>
          </div>
          <div className="contact-form">
            <h2>Contact Us</h2>
            <Form>
              <Form.Group>
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="subject" placeholder="Subject" />
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
