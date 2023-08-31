import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import ShowLoggedInUser from "./ShowLoggedInUser"
import { Link } from "react-router-dom"
const TopBar = () => {


  const padding = {
    padding: 5
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em><ShowLoggedInUser/></em>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default TopBar