
/**
 * Name: Sathvik Alla
 * Date: November 20, 2026
 * Course: IT-302-001 Advanced Internet Applications
 * Assignment: Phase 5 C.U.D. Node.js Data using React.js
 * Email: sa3242@njit.edu
 */

import React, { useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import StarWarsDataService from "../service/StarWarsDataService";

function AddFeedback({ user }) {
  const { id } = useParams();

  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const recordUrl = `/sa3242_starwars/${id}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("Please log in before submitting feedback.");
      return;
    }

    if (!text.trim()) {
      setError("Please enter your feedback.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await StarWarsDataService.createFeedback(
        id,
        user.username,
        user.userId,
        text.trim()
      );

      setSuccess("Feedback created successfully!");
      setText("");
    } catch (err) {
      console.error("Error creating feedback:", err);
      setError("Unable to save feedback. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <Alert variant="warning">
        Please log in to add feedback.{" "}
        <Link to="/sa3242_login">Go to Login</Link>
      </Alert>
    );
  }

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: "700px" }}>
      <Card.Body>
        <Card.Title className="fs-3">
          Add Star Wars Feedback
        </Card.Title>

        <Card.Text>
          Share your thoughts about this Star Wars record.
        </Card.Text>

        <p>
          <strong>Logged in as:</strong> {user.username}
        </p>

        {success && (
          <Alert variant="success">{success}</Alert>
        )}

        {error && (
          <Alert variant="danger">{error}</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Feedback</Form.Label>

            <Form.Control
              as="textarea"
              rows={5}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Enter your feedback about this Star Wars record..."
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={saving}
          >
            {saving ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Saving...
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>

          <Button
            as={Link}
            to={recordUrl}
            variant="secondary"
            className="ms-2"
          >
            Back to Record
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddFeedback;
