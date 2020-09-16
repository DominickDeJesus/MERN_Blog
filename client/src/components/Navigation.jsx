import React from 'react';
import { Navbar, Dropdown, Nav, DropdownButton } from 'react-bootstrap';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" className="w-100 px-3">
      <Navbar.Brand className="mr-auto" href="/">
        Blah Blah Blog...
      </Navbar.Brand>
      <Nav>
        <DropdownButton variant="flat" className="profile-btn" title="Proflie">
          <Dropdown.Item as={Link} to="/login">
            Login
          </Dropdown.Item>
          <Logout />
          <Dropdown.Item as={Link} to="/signup">
            SignUp
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/profile">
            Profile
          </Dropdown.Item>
        </DropdownButton>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard">
          Dashboard
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};
export default Navigation;
