/**
 * Name: Sathvik Alla
 * Date: October 30, 2026
 * Course: IT-302-001
 * Assignment: Phase 4 Read Node.js Data using React.js
 * Email: sa3242@njit.edu
 */

import React, { useEffect, useState } from "react";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import StarWarsDataService from "../service/StarWarsDataService";

function StarWar() {
  const { id } = useParams();

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

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
                  {key.replace(/_/g, " ").replace(/([A-Z])/g, " $1")}:
                </strong>{" "}
                {Array.isArray(value)
                  ? value.length > 0
                    ? value.join(", ")
                    : "None"
                  : value && typeof value === "object"
                    ? JSON.stringify(value)
                    : value === null || value === undefined || value === ""
                      ? "Not available"
                      : String(value)}
              </div>
            ))}
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