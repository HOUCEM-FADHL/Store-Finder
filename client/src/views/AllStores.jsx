import React from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AllStores = () => {
    // State to hold the list of stores
    const [stores, setStores] = useState([]);
    // Hook to allow navigation within the component
    const navigate = useNavigate();

    // Fetch the list of stores from the server when the component mounts
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/stores`)
            .then((res) => {
                console.log("res List", res);
                console.log("res.data List", res.data);
                // Set the list of stores in the state
                setStores(res.data);
                // Sort the stores by Store Number
                const sortedStores = res.data.sort((a, b) => a.number - b.number);
                // Set the sorted stores in the state
                setStores(sortedStores);
            })
            .catch((err) => console.log(err));
    }, []);

    // Function to delete a store by its ID
    const deleteStore = (id) => {
        axios
            .delete(`http://localhost:8000/api/stores/${id}`)
            .then((res) => {
                console.log("res Delete", res);
                console.log("res.data Delete", res.data);
                // Filter out the deleted store from the state
                setStores(stores.filter((store) => store._id !== id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h1 className="container w-75 mx-auto mb-3">Store Finder</h1>
            <div className="container w-75 mx-auto">
                <h2>Find Stores in your Areas</h2>
                <Table bordered striped>
                    <thead>
                        <tr>
                            <th>Store</th>
                            <th>Store Number</th>
                            <th>Open</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through the list of stores and render a table row for each */}
                        {stores.map((store) => (
                            <tr key={store._id}>
                                {/* Link to the individual store page */}
                                <td><Link to={`/stores/${store._id}`}>{store.name}</Link></td>
                                <td>{store.number}</td>
                                <td>{store.isOpen ? 'True' : 'False'}</td>
                                <td className='justify-content-center'>
                                    {/* Render delete button only if the store is open */}
                                    {store.isOpen ? (
                                        <Button
                                            className="delete-button"
                                            variant="danger"
                                            onClick={(e) => deleteStore(store._id)}
                                        >
                                            Delete
                                        </Button>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {/* Button to navigate to the add store page */}
                <Button variant='warning' className="add-button" onClick={() => navigate('/stores/add')}>
                    Can't find Your Store
                </Button>
            </div>
        </div>
    );
};

export default AllStores;
