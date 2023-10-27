import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contacts.css';

const Contacts = () => {
  return (
    <Container>
      <Row className="mt-3 mb-5">
        <Col lg={8}>
          <h1 className="display-4 mb-4">Contact Us</h1>
        </Col>
      </Row>

      <Row className="sec_sp">
        <Col lg={5} className="mb-5">
          <address>
            <p className="Description">
              Sea Dragon Energy Inc. understands the needs of our communities.
            </p>
            <strong>Email:</strong> <a href="mailto:contact@seadragon.energy">contact@seadragon.energy</a>
          </address>
        </Col>

        <Col lg={7} className="d-flex align-items-center">
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
    </Container>
  );
};

export default Contacts;
