import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import StarWarsList from "./components/StarWarsList";
import StarWar from "./components/StarWar";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setUser({ username: 'sa3242' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Star Wars Database
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/sa3242_starwars">
                Star Wars Records
              </Nav.Link>
            </Nav>

            <Nav>
              {user ? (
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button variant="outline-light" onClick={handleLogin}>
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route
            path="/"
            element={<StarWarsList />}
         />

          <Route
            path="/sa3242_starwars"
            element={<StarWarsList />}
         />

          <Route
            path="/sa3242_starwars/:id"
            element={<StarWar />}
          />
        </Routes> 
      </Container>
    </>
  );
}

export default App;