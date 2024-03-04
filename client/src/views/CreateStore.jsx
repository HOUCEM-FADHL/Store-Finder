import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateStore = () => {
  // State to hold form input values
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // State to handle form validation errors
  const [error, setError] = useState({});
  // Hook to allow navigation within the component
  const navigate = useNavigate();
  const [exist, setExist] = useState(false);
  const onSubmitHandler = async (e,number) => {
    e.preventDefault();

    try {
      // Check if store number already exists
      const response = await axios.get(`http://localhost:8000/api/store/${number}`);
      // setStore(response.data);
      console.log("resNumber", response.data.number);
      setExist(true);
    } catch (err) {
      console.log(err);
      setExist(false);

      // If store number doesn't exist, proceed with the POST request
      axios
        .post("http://localhost:8000/api/stores/add", {
          name,
          number,
          isOpen,
        })
        .then((res) => {
          console.log("res.dataNumber", res.data.number);
          navigate("/stores/" + res.data._id);
          setError({});
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          setError(err.response.data.errors);
        });
    }
  };

  return (
    <div>
      {/* Header with navigation link to go back home */}
      <div className="d-flex justify-content-between align-items-center container w-75 mx-auto mb-3">
        <h1>Store Finder</h1>
        <Link to="/">Go Back Home</Link>
      </div>
      <div className="container w-50 mx-auto">
        <h2>Create Store</h2>
        {/* Form for creating a new store */}
        <form onSubmit={(e)=>onSubmitHandler(e,number)}>
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
          {exist? <p className="text-danger">Store already exist</p> : null}
          {/* Checkbox for Open status */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Open?"
              checked={isOpen}
              onChange={(e) => setIsOpen(e.target.checked)}
              />
          </Form.Group>
          {/* Submit button to add a new store */}
          <Button variant="warning" type="submit">
            Add a new Store!
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateStore;