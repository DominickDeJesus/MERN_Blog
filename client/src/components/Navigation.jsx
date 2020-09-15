import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import {
  Navbar,
  Dropdown,
  Nav,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/Dropdown';
import Logout from '../components/Logout';
import { Link, useHistory } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs';

const Navigation = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const history = useHistory();
  return (
    <Navbar sticky="top" bg="white" expand="xlg">
      <Navbar.Toggle variant="success" id="dropdown-basic" />
      <Navbar.Brand sticky="top" href="/">
        <h3 className="m-0">Blah Blah Blog...</h3>
      </Navbar.Brand>
      <Navbar sticky="top">
        <Link className="profile-icon" as={Link} to="/Dashboard">
          <BsPerson size="40px" color="grey" />
        </Link>
      </Navbar>
      <Navbar.Collapse>
        <div style={{ width: '10rem' }}>
          <Dropdown.Item
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Dropdown.Item>
          <Logout />
          <Dropdown.Item
            onClick={() => {
              history.push('/SignUp');
            }}
          >
            Register
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              history.push('/Profile');
            }}
          >
            Profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              history.push('/addPost');
            }}
          >
            Add Post
          </Dropdown.Item>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navigation;
