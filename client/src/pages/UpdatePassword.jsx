import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdatePassword = ({ history }) => {
  const [password, setPassword] = useState(null);

  const handleChange = (event) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.password !== password.confirmPassword) {
      alert('Passwords must match!');
      return;
    }
    axios
      .put(
        '/api/password',
        { password: password.password },
        { withCredentials: true }
      )
      .then((res) => {
        //add alert
        history.push('/login');
      })
      .catch((error) => console.log(error));
  };
  return (
    <Container>
      <div className="reset">
        <div>
          <h2>Update Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handleChange}
                name="password"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <span>Confirm Password</span>
              </Form.Label>
              <Form.Control
                type="password"
                onChange={handleChange}
                name="confirmPassword"
                required
              />
            </Form.Group>
            <Form.Group>
              <Button variant="flat" className="info-btn" type="submit">
                <span>Update Password</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default UpdatePassword;
