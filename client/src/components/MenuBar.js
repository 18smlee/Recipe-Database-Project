import React from 'react';

import { 
  Container, 
  Form, 
  Navbar, 
  NavDropdown, 
  Nav, 
  FormControl,
  Button,
} from 'react-bootstrap';

import logo from '../images/logo.png';

class MenuBar extends React.Component {
    render() {
        return(
          <Navbar>
            <Container>
              <Navbar.Brand href="#home">
              <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                      />{' '}
                    Creative Cuisine
                    </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/recipes">Recipes</Nav.Link>
                  <Nav.Link href="/users">Users</Nav.Link>
                  <Nav.Link href="/mealmaker">Meal Maker</Nav.Link>
                  <Nav.Link href="/chopped">Chopped Inspiration</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )
    }
}

export default MenuBar
