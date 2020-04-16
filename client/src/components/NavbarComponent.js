import React from 'react';
import ReactDOM from 'react-dom';
import { Nav,Navbar,Card,Button,Form,Row,Col, Container,Modal,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import newslogo from "./newslogo.png";

class NavbarComponent extends React.Component {
  
  render() {
  

    return (
      <>


<Navbar bg="dark" variant="dark">
<Navbar.Brand href="#home">
      <img
        src={newslogo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Navbar.Brand href="/home">DailyNews</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/home">Home</Nav.Link>
      
      
      
    </Nav>

    <Nav className="ml-auto">
    <Nav.Link href="/OptionPage">Subscripition</Nav.Link>
      <Nav.Link href="/bookmark">Bookmark</Nav.Link>
      <Nav.Link href="/About">About Us</Nav.Link>
      <Nav.Link className="border btn-outline-info" href="/Logout">Logout</Nav.Link>
    </Nav>
    
  </Navbar>


      
      </>



    
    ) 
  }
}

export default NavbarComponent