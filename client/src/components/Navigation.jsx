import React from 'react';
import { Navbar, Dropdown } from 'react-bootstrap';
import Logout from '../components/Logout';
import { Link, useHistory } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs';

const Navigation = () => {
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
              history.push('/AddPost');
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
