import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

export default function MainNav() {
  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Junseo Han
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} href="/favourites">
                Favourites
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
