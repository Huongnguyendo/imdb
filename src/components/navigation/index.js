import React from "react";
import {Navbar, Form, FormControl, NavDropdown, Button, Nav} from "react-bootstrap";

const Navigation = ({searchByKeyword, searchByTopRated}) => {
    let keyword = "";
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">MovieBox</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Now Playing</Nav.Link>
            <Nav.Link href="#features" onClick={() => searchByTopRated()}>Top rated</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={(event) => {event.preventDefault(); searchByKeyword(keyword);}}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(event) => {keyword=event.target.value; console.log("keyword", keyword);}}/>
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
