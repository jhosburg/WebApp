import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import './Contacts.css';

const Contacts = () => {
  return (
    <Container>
      <Row className= "mb-5 mt-3">
        <Col lg='8'>
          <h1 className="display-4 mb-4">
          Contact Us
          </h1>
          </Col>
          </Row>

          <Row className= "sec_sp">
            <Col lg='5' className="mb-5">
              <h3 className="color_sec py-4">Get in touch</h3>
              <address>
                <strong>Email : www.seadragon.energy</strong>
                <br/>
                <br/>
              </address>
              <p>address</p>
            </Col>
              <Col lg='7' className="d-flex align-items-center">
                <form className="contact_form w-100">
                  <Row>
                    <Col lg='6' className="form-group">
                    <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    type="text"
                    />
                    </Col>
                    <Col lg='6' className="form-control">
                    <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    />
              </Col>
              </Row>
              <textarea className="form-control rounded-0" id="message"
                        name="message"
                        placeholder="Message"
                        rows='5'
              ></textarea>
              <br />
              <Row>
                <Col lg='12' className="form-group">
                  <button classname="btn ac_btn" type="submit">Send</button>
                </Col>
              </Row>
              </form>
            </Col>
          </Row>
        </Container>

  );
}

export default Contacts

