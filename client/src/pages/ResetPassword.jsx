import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Nav from '../components/Nav';

const ResetPassword = () => {
  const [email, setEmail] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    axios
      .get(`/api/password?email=${email}`)
      .then((res) => {
        form.reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Nav cross="/" />
      <div className="reset">
        <div>
          <h2>Reset Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>
                <span>Email address</span>
              </Form.Label>
              <Form.Control
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="flat" className="info-btn" type="submit">
                Send Email
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ResetPassword;
