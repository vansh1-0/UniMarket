import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import listingService from '../services/listingService';

function CreateListingPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Textbooks', // Default category
    });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const { title, description, price, category } = formData;

    // Handle changes for text inputs
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file selection for the image
    const onFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const onSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.token) {
            alert('You must be logged in to create a listing.');
            navigate('/login');
            return;
        }

        if (!image) {
            alert('Please select an image for your listing.');
            return;
        }

        // Use FormData to send both text and file data
        const listingData = new FormData();
        listingData.append('title', title);
        listingData.append('description', description);
        listingData.append('price', price);
        listingData.append('category', category);
        listingData.append('image', image);

        listingService.createListing(listingData, user.token)
            .then(() => {
                alert('Listing created successfully!');
                navigate('/my-listings');
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.msg || 'An unknown error occurred.';
                alert('Failed to create listing: ' + errorMessage);
            });
    };

    return (
        <div className="form-container">
            <h2>Create a New Listing</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={title} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" value={description} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price (₹)</label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        value={price} 
                        onChange={onChange} 
                        min="1" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" value={category} onChange={onChange}>
                        <option value="Textbooks">Textbooks</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Product Image (JPG, JPEG, PNG only)</label>
                    <input 
                        type="file" 
                        id="image" 
                        name="image" 
                        accept=".jpg,.jpeg,.png" 
                        onChange={onFileChange} 
                        required 
                    />
                </div>
                <button type="submit" className="form-btn">Create Listing</button>
            </form>
        </div>
    );
}

export default CreateListingPage;