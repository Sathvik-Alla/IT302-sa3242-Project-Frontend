
/**
 * Name: Sathvik Alla
 * Date: November 20, 2026
 * Course: IT-302-001 Advanced Internet Applications
 * Assignment: Phase 5 C.U.D. Node.js Data using React.js
 * Email: sa3242@njit.edu
 */

import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

import StarWarsList from "./components/StarWarsList";
import StarWar from "./components/StarWar";
import Login from "./components/Login";
import AddFeedback from "./components/AddFeedback";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/sa3242_starwars">
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
                <>
                  <Navbar.Text className="me-3">
                    Welcome, {user.username}
                  </Navbar.Text>

                  <Button
                    variant="outline-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  as={Link}
                  to="/sa3242_login"
                  variant="outline-light"
                >
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
            element={<Navigate to="/sa3242_starwars" replace />}
          />

          <Route
            path="/sa3242_starwars"
            element={<StarWarsList />}
          />

          <Route
            path="/sa3242_starwars/:id"
            element={<StarWar user={user} />}
          />

          <Route
            path="/sa3242_login"
            element={<Login login={handleLogin} />}
          />

          <Route
            path="/sa3242_starwars/:id/feedback"
            element={<AddFeedback user={user} />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
