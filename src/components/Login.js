
/**
 * Name: Sathvik Alla
 * Date: November 20, 2026
 * Course: IT-302-001 Advanced Internet Applications
 * Assignment: Phase 5 C.U.D. Node.js Data using React.js
 * Email: sa3242@njit.edu
 */

import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ login }) {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.trim() || !userId.trim()) {
      setError("Please enter your name and user ID.");
      return;
    }

    login({
      username: username.trim(),
      userId: userId.trim()
    });

    setError("");
    navigate("/sa3242_starwars");
  };

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: "500px" }}>
      <Card.Body>
        <Card.Title>Star Wars Database Login</Card.Title>

        <Card.Text>
          Enter your name and user ID to manage feedback.
        </Card.Text>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first and last name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
