import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const OneStore = () => {
  // State to hold the details of a single store
  const [store, setStore] = useState({});
  // Get the store ID from the URL parameters
  const { id } = useParams();
  // Hook to allow navigation within the component
  const navigate = useNavigate();

  // Fetch the details of the specific store based on the ID when the component mounts or the ID changes
  useEffect(() => {
    console.log("id-details:", id);
    axios
      .get(`http://localhost:8000/api/stores/${id}`)
      .then((res) => {
        console.log("res.data", res.data);
        // Set the store details in the state
        setStore(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Function to navigate to the edit store details page
  const editStore = (id) => {
    console.log("id", id);
    navigate(`/stores/edit/${id}`);
  };

  return (
    <div>
      {/* Header with navigation link to go back home */}
      <div className="d-flex justify-content-between align-items-center container w-75 mx-auto mb-3">
        <h1>Store Finder</h1>
        <Link to="/">Go Back Home</Link>
      </div>
      <div className="container w-75 mx-auto">
        {/* Card displaying store details */}
        <Card className="mb-2 w-50" bg="warning" text="dark">
          <Card.Body>
            <Card.Title>{store.name}</Card.Title>
            <Card.Text>Store Number: {store.number}</Card.Text>
          </Card.Body>
          {/* Display whether the store is open or closed in the footer */}
          <Card.Footer className="text-muted d-flex align-items-center justify-content-between">
            {store.isOpen ? "Open" : "Close"}
          </Card.Footer>
        </Card>
        {/* Button to navigate to the edit store details page */}
        <Button variant="dark" onClick={() => editStore(store._id)}>
          Edit Store Details
        </Button>
      </div>
    </div>
  );
};

export default OneStore;
