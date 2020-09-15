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
    <Container>
      <div className="login">
        <div>
          <h1>Login</h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <div>
            <Form.Label className="text">Email address</Form.Label>
            <Form.Control
              className="label"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <Form.Label className="text">Password</Form.Label>
            <Form.Control
              className="label"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <Link className="login-op" to="/reset-password">
              Forgot Password?
            </Link>
            <Link className="login-op" to="/signup">
              Need an Account? Sign up.
            </Link>
          </div>
          <div>
            <Form.Check type="checkbox" label="Remember Me" />
          </div>
          <div className="info-btn-flex">
            <Button className="info-btn" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
