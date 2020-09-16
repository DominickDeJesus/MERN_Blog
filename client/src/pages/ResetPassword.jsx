import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';

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
    <Container className="d-flex flex-column justify-content-center align-items-center fullscreen">
      <h2 className="py-3">Reset Password</h2>
      <Form className="w-25" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button type="submit">Send Email</Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ResetPassword;
