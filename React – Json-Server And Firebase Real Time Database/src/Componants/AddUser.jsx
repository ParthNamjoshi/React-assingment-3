import React, { useState } from 'react';
import { addUser } from '../Services/Api'; 
import { useNavigate } from 'react-router-dom'; 
import './AddUser.css';

// Component for handling adding a new user
function AddUser() {
  // for managing form input data 
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });

  // for managing the modal open/close state
  const [isOpen, setIsOpen] = useState(false);

  // useNavigate hook for programmatically navigate to another page after adding a user
  const navigate = useNavigate();

  // for form input changes and updates the user state with the value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handles the form submission logic for adding a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure all fields are filled before submitting
    if (!user.firstName || !user.lastName || !user.email) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addUser(user);
      navigate('/user'); 
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Opens the modal 
  const openModal = () => setIsOpen(true);
  
  // Closes the modal and resets the form fields
  const closeModal = () => {
    setIsOpen(false);
    setUser({ firstName: '', lastName: '', email: '' }); // Reset user state to empty fields
  };

  return (
    <div>
      
      <button onClick={openModal}>Add User</button>

      
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
             
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleChange}
              />
              
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleChange}
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
              />
             
              <button type="submit">Add User</button>
             
              <button type="button" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser; 

