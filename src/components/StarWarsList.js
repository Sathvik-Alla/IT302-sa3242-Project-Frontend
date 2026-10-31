/**
 * Name: Sathvik Alla
 * Date: October 30, 2026
 * Course: IT-302-001
 * Assignment: Phase 4 Read Node.js Data using React.js
 * Email: sa3242@njit.edu
 */

import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarWarsDataService from "../service/StarWarsDataService";

function StarWarsList() {
  const [starWars, setStarWars] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 20;

  useEffect(() => {
    let cancelled = false;

    const retrieveStarWars = async () => {
      setLoading(true);
      setError("");

      try {
        const response = activeSearch
          ? await StarWarsDataService.findByName(activeSearch, pageNumber)
          : await StarWarsDataService.getAll(pageNumber);

        if (!cancelled) {
          setStarWars(response.data.star_wars || []);
          setTotalResults(response.data.total_results || 0);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error retrieving Star Wars records:", err);
          setError("Unable to retrieve Star Wars records from the backend.");
          setStarWars([]);
          setTotalResults(0);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    retrieveStarWars();

    return () => {
      cancelled = true;
    };
  }, [pageNumber, activeSearch]);

  const handleSearch = (event) => {
    event.preventDefault();

    setPageNumber(0);
    setActiveSearch(searchName.trim());
  };

  const handleReset = () => {
    setSearchName("");
    setPageNumber(0);
    setActiveSearch("");
  };

  const formatFieldName = (field) => {
    return field
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const getRecordFields = (record) => {
    const excludedFields = [
      "_id",
      "name",
      "url",
      "image",
      "created",
      "edited",
      "lastUpdated",
      "residents",
      "films",
      "characters",
      "pilots",
      "people"
    ];

    return Object.entries(record)
      .filter(([key, value]) => {
        return (
          !excludedFields.includes(key) &&
          value !== null &&
          value !== undefined &&
          value !== "" &&
          !Array.isArray(value) &&
          typeof value !== "object"
        );
      })
      .slice(0, 4);
  };

  return (
    <div>
      <h2 className="mb-4">Star Wars Database Records</h2>

      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={8}>
            <Form.Group>
              <Form.Label>Search Star Wars Records by Name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Search Tatooine, Luke Skywalker, Darth Vader..."
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4} className="d-flex align-items-end gap-2">
            <Button type="submit" variant="primary">
              Search
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading Star Wars records...</p>
        </div>
      ) : (
        <>
          {!error && (
            <p>
              Showing {starWars.length} of {totalResults} matching records.
            </p>
          )}

          <Row>
            {starWars.map((record) => (
              <Col md={4} className="mb-4" key={record._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      {record.name || record.title || "Unnamed Record"}
                    </Card.Title>

                    <Card.Text as="div">
                        {getRecordFields(record).map(([key, value]) => (
                        <div key={key} className="mb-1">
                            <strong>{formatFieldName(key)}:</strong>{" "}
                            {String(value).length > 150
                            ? String(value).substring(0, 150) + "..."
                            : String(value)}
                            {key === "diameter" ? " km" : ""}
                        </div>
                        ))}
                    </Card.Text>

                    <div className="mt-auto pt-3">
                      <Button
                        as={Link}
                        to={`/sa3242_starwars/${record._id}`}
                        variant="primary"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {!error && starWars.length === 0 && (
            <Alert variant="info">
              No Star Wars records were found.
            </Alert>
          )}

          <div className="d-flex justify-content-between mt-3 mb-4">
            <Button
              variant="outline-primary"
              disabled={loading || pageNumber === 0}
              onClick={() => setPageNumber((page) => page - 1)}
            >
              Previous
            </Button>

            <span>Page {pageNumber + 1}</span>

            <Button
              variant="outline-primary"
              disabled={
                loading ||
                (pageNumber + 1) * itemsPerPage >= totalResults
              }
              onClick={() => setPageNumber((page) => page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default StarWarsList;