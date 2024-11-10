import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Component for editing an existing user's information
function EditUser() {
    // to get the user ID 
    const { id } = useParams();
    // Hook to programmatically navigate to different routes
    const navigate = useNavigate();
    // State to store the user data fetched from the server
    const [user, setUser] = useState(null);
    // State to track loading status
    const [loading, setLoading] = useState(true);

    // Fetch user data when component mounts or the ID changes
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

    // Handle input changes to update the user state dynamically
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    // Handle form submission to update user data on the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await axios.put(`http://localhost:5000/users/${id}`, user);
            navigate('/'); 
        } catch (error) {
            console.error("Error updating user:", error); 
        }
    };

    // Display a loading message if data is being fetched
    if (loading) {
        return <div>Loading...</div>; 
    }

    // Display a message if no user is found
    if (!user) {
        return <div>User not found.</div>; 
    }

    // Render the form to edit user details
    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
}

export default EditUser;
