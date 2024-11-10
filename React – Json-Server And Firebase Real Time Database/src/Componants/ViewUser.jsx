import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Component to display details of a single user
function ViewUser() {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    // State to track loading status
    const [loading, setLoading] = useState(true);

    // Fetch user data when the component mounts or when the ID changes
    useEffect(() => {
        const fetchUser = async () => {
            try {
                
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setUser(response.data); 
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchUser();
    }, [id]);

    // Display loading message while user data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display a message if no user data is found
    if (!user) {
        return <div>User not found.</div>;
    }

    // Render user details
    return (
        <div>
            <h2>User Details</h2>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}

export default ViewUser;
