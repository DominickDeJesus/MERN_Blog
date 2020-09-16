import React, { useState } from 'react';
import {
  Navbar,
  Dropdown,
  Nav,
  DropdownButton,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import Logout from '../components/Logout';
import { Link, useHistory } from 'react-router-dom';

const Navigation = () => {
  const history = useHistory();
  const [search, setSearch] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/?search=${search}`);
  };

  return (
    <Navbar bg="primary" variant="dark" className="w-100 px-3">
      <Navbar.Brand href="/">Blah Blah Blog...</Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard">
          Dashboard
        </Nav.Link>
      </Nav>
      <DropdownButton
        variant="flat"
        className="profile-btn mr-auto"
        title="Proflie"
      >
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
      <Form inline onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(event) => setSearch(event.target.value)}
          required
        />
        <Button variant="outline-light" type="submit">
          Search
        </Button>
      </Form>
    </Navbar>
  );
};
export default Navigation;
