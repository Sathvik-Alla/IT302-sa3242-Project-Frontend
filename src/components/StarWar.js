
/**
 * Name: Sathvik Alla
 * Date: November 20, 2026
 * Course: IT-302-001 Advanced Internet Applications
 * Assignment: Phase 5 C.U.D. Node.js Data using React.js
 * Email: sa3242@njit.edu
 */

import React, { useEffect, useState } from "react";
import { Card, Button, Alert, Spinner, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import StarWarsDataService from "../service/StarWarsDataService";

function StarWar({ user }) {
  const { id } = useParams();

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackError, setFeedbackError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setRecord(null);

    StarWarsDataService.get(id)
      .then((response) => {
        setRecord(response.data);
      })
      .catch((err) => {
        console.error("Error retrieving record:", err);
        setError("Unable to retrieve this Star Wars record.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);


  const loadFeedback = async () => {
    setFeedbackLoading(true);
    setFeedbackError("");

    try {
      const response = await StarWarsDataService.getFeedback(id);
      setFeedback(response.data.comments || []);
    } catch (err) {
      console.error("Error loading feedback:", err);
      setFeedbackError("Unable to load feedback.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    setFeedbackLoading(true);
    setFeedbackError("");
    setFeedback([]);

    StarWarsDataService.getFeedback(id)
      .then((response) => {
        if (active) setFeedback(response.data.comments || []);
      })
      .catch((err) => {
        console.error(err);
        if (active) setFeedbackError("Unable to load feedback.");
      })
      .finally(() => {
        if (active) setFeedbackLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleUpdate = async (commentId) => {
    if (!user || !editText.trim()) return;

    setBusyId(commentId);
    setMessage("");
    setFeedbackError("");

    try {
      await StarWarsDataService.updateFeedback(
        commentId,
        user.userId,
        editText.trim()
      );

      setEditingId(null);
      setMessage("Feedback updated successfully!");
      await loadFeedback();
    } catch (err) {
      console.error(err);
      setFeedbackError("Unable to update feedback.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (commentId) => {
    if (!user) return;

    if (!window.confirm("Delete this feedback?")) return;

    setBusyId(commentId);
    setMessage("");
    setFeedbackError("");

    try {
      await StarWarsDataService.deleteFeedback(
        commentId,
        user.userId
      );

      setMessage("Feedback deleted successfully!");
      await loadFeedback();
    } catch (err) {
      console.error(err);
      setFeedbackError("Unable to delete feedback.");
    } finally {
      setBusyId(null);
    }
  };


  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" />
        <p>Loading Star Wars record...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!record) {
    return <Alert variant="warning">Record not found.</Alert>;
  }

  return (
    <div>
      <h2 className="mb-4">Star Wars Record Details</h2>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="fs-3">
            {record.name || "Unnamed Record"}
          </Card.Title>

          <Card.Text>
            Explore the information available for this Star Wars record.
          </Card.Text>

          <hr />

          {Object.entries(record)
            .filter(([key]) => key !== "_id")
            .map(([key, value]) => (
              <div key={key} className="mb-3">
                <strong>
                  {key
                    .replace(/_/g, " ")
                    .replace(/([A-Z])/g, " $1")}:
                </strong>{" "}
                {Array.isArray(value)
                  ? value.length > 0
                    ? value.join(", ")
                    : "None"
                  : value && typeof value === "object"
                    ? JSON.stringify(value)
                    : value === null ||
                        value === undefined ||
                        value === ""
                      ? "Not available"
                      : String(value)}
              </div>
            ))}
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Star Wars Feedback</Card.Title>

          <Card.Text>
            Share your thoughts about this Star Wars record.
          </Card.Text>

          {user ? (
            <Button
              as={Link}
              to={`/sa3242_starwars/${id}/feedback`}
              variant="primary"
            >
              Add Feedback
            </Button>
          ) : (
            <>
              <Alert variant="info">
                Please log in to add feedback.
              </Alert>

              <Button
                as={Link}
                to="/sa3242_login"
                variant="primary"
              >
                Login to Add Feedback
              </Button>
            </>
          )}


          <hr />

          <h5>Existing Feedback</h5>

          {message && (
            <Alert variant="success">{message}</Alert>
          )}

          {feedbackError && (
            <Alert variant="danger">{feedbackError}</Alert>
          )}

          {feedbackLoading ? (
            <Spinner animation="border" size="sm" />
          ) : feedback.length === 0 ? (
            <p>No feedback has been submitted yet.</p>
          ) : (
            feedback.map((comment) => (
              <Card key={comment._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{comment.userName}</Card.Title>

                  {editingId === comment._id ? (
                    <>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="mb-2"
                      />

                      <Button
                        variant="success"
                        className="me-2"
                        disabled={
                          busyId !== null || !editText.trim()
                        }
                        onClick={() => handleUpdate(comment._id)}
                      >
                        Save Changes
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Card.Text>{comment.text}</Card.Text>

                      {user && user.userId === comment.userId && (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            disabled={busyId !== null}
                            onClick={() => {
                              setEditingId(comment._id);
                              setEditText(comment.text);
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            size="sm"
                            disabled={busyId !== null}
                            onClick={() => handleDelete(comment._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            ))
          )}

        </Card.Body>
      </Card>

      <Button
        as={Link}
        to="/sa3242_starwars"
        variant="secondary"
        className="mt-3"
      >
        Back to Star Wars Records
      </Button>
    </div>
  );
}

export default StarWar;
