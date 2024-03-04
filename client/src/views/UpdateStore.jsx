import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const UpdateStore = () => {
  // Get the store ID from the URL parameters
  const { id } = useParams();

  // State to hold form input values
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // State to handle form validation errors
  const [error, setError] = useState({});
  // Hook to allow navigation within the component
  const navigate = useNavigate();

  // Fetch store details for pre-filling the form when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/stores/${id}`)
      .then((res) => {
        // Set state with the fetched store details
        setName(res.data.name);
        setNumber(res.data.number);
        setIsOpen(res.data.isOpen);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Form submission handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Send a PATCH request to update the store details
    axios
      .patch(`http://localhost:8000/api/stores/edit/${id}`, {
        name,
        number,
        isOpen,
      })
      .then((res) => {
        console.log('updated data: ', res.data);
        // Redirect to the updated store's details page
        navigate(`/stores/${id}`);
        // Clear any previous form validation errors
        setError({});
      })
      .catch((err) => {
        console.log(err);
        // Set form validation errors in the state
        setError(err.response.data.errors);
      });
  };

  return (
    <div>
      {/* Header with navigation link to go back home */}
      <div className="d-flex justify-content-between align-items-center container w-75 mx-auto mb-3">
        <h1>Store Finder</h1>
        <Link to="/">Go Back Home</Link>
      </div>
      <div className="container w-50 mx-auto">
        <h2>Update Store</h2>
        {/* Form for updating store details */}
        <form onSubmit={onSubmitHandler}>
          {/* Input for Store Name */}
          <Form.Group className="mb-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              placeholder="Enter Store Name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          {/* Display validation error for Store Name, if any */}
          {error.name ? (
            <p className="text-danger">{error.name.message}</p>
          ) : null}
          {/* Input for Store Number */}
          <Form.Group className="mb-3">
            <Form.Label>Store Number</Form.Label>
            <Form.Control
              placeholder="Store Number"
              value={number}
              type="number"
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Group>
          {/* Display validation error for Store Number, if any */}
          {error.number ? (
            <p className="text-danger">{error.number.message}</p>
          ) : null}
          {/* Checkbox for Open status */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Open?"
              checked={isOpen}
              onChange={(e) => setIsOpen(e.target.checked)}
            />
          </Form.Group>
          {/* Submit button to edit store details */}
          <Button variant="warning" type="submit">
            Edit Store Details
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStore;
