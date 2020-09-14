import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';
import Image from 'react-bootstrap/Image';

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
    <Container>
      <div className="signUp">
        <div>
          <h6>
            The final step, lets set up your profile so we can save your
            progress.
          </h6>
          <p>Don't worry, your information is safe with us</p>
        </div>
        <div className="ilustration"></div>
        <Form onSubmit={handleSubmit}>
          <div>
            <Form.Label className="text">Name:</Form.Label>
            <Form.Control
              className="label"
              type="name"
              placeholder="Ex. John Smith"
              name="name"
              onChange={handleChange}
            />
          </div>

          <div>
            <Form.Label className="text">Email address</Form.Label>
            <Form.Control
              className="label"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
            <Link className="login-op" to="/login">
              Already have an account? Login.
            </Link>
          </div>
          <div>
            <Form.Check type="checkbox" label="Remember Me" />
          </div>

          <div>
            <div className="info-btn-flex">
              <Button variant="flat" className="info-btn" type="submit">
                Login
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default SignUp;
