import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';

const SignUp = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/api/users/', formData)
      .then((response) => {
        sessionStorage.setItem('user', response.data);
        setCurrentUser(response.data);
        history.push('/');
      })
      .catch(() => swal('Error', 'Please check the inputs', 'warning'));
  };
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center fullscreen">
      <h1 className="py-3">Sign Up</h1>
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="text">Name:</Form.Label>
          <Form.Control
            className="label"
            type="name"
            placeholder="Ex. John Smith"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text">Email address</Form.Label>
          <Form.Control
            className="label"
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text">Password</Form.Label>
          <Form.Control
            className="label"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Link className="login-op" to="/login">
            Already have an account?
          </Link>
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button className="w-25" type="submit">
            Sign Up
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default SignUp;
