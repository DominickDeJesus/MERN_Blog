import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import swal from 'sweetalert';

const Login = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/api/users/login', formData)
      .then((response) => {
        sessionStorage.setItem('user', response.data);
        setCurrentUser(response.data);
        history.push('/');
      })
      .catch(() => swal('Oops!', 'something went wrong', 'warning'));
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center fullscreen">
      <h1 className="py-3">Login</h1>
      <Form className="w-50" onSubmit={handleSubmit}>
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
        <Form.Group className="d-flex justify-content-around">
          <Link to="/reset-password">Forgot Password?</Link>
          <Link to="/signup">Need an Account?</Link>
        </Form.Group>

        <Form.Group className="d-flex justify-content-center">
          <Button className="w-25" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Login;
