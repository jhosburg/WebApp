import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contacts.css';
import mpower from './mpower.png'; // Import your image here

const Contacts = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '100vh' }}>
      <Row className="mt-3 mb-5">
        <Col lg={8} className="text-center">
          <h1 className="display-4 mb-4">Contact Us</h1>
        </Col>
      </Row>

      <Row className="sec_sp">
        <Col lg={5} className="mb-5">
          <address>
            <p className="Description">
              Sea Dragon Energy Inc. understands the needs of California.
            </p>
            <strong>Email:</strong> <a href="mailto:www.seadragon.energy">www.seadragon.energy</a>
          </address>
        </Col>

        <Col lg={7} className="text-center">
          <Form className="contact__form w-100">
            <Row>
              <Col lg={6} className="form-group">
                <Form.Control
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                />
              </Col>
              <Col lg={6} className="form-group">
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </Col>
            </Row>
            <Form.Control
              id="message"
              name="message"
              as="textarea"
              rows={5}
              placeholder="Message"
            />
            <br />
            <Button className="btn ac_btn" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="sec_sp">
        <Col lg={12} className="text-center mb-5">
          <img
            src={mpower} // Use the imported image variable
            alt="Image Description"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
          <p className="image-description">
            The mPower allows users to manage their energy
           consumption at less cost.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacts;
