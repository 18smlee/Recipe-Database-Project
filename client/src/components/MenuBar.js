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

// Logo not working rn
class MenuBar extends React.Component {
    render() {
        return(
          <Navbar bg="light" expand="lg">
          <Container fluid>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          Creative Cuisine
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
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
