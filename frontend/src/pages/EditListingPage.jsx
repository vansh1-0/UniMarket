import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import listingService from '../services/listingService';

function EditListingPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Textbooks',
    });
    const [currentImage, setCurrentImage] = useState('');
    const [newImage, setNewImage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            navigate('/login');
            return;
        }
        listingService.getListing(id, user.token)
            .then(response => {
                const { title, description, price, category, image } = response.data;
                setFormData({ title, description, price, category });
                setCurrentImage(`http://localhost:5000${image}`);
            })
            .catch(error => {
                console.error("Failed to fetch listing details:", error);
                alert("Could not fetch listing details.");
                navigate('/my-listings');
            });
    }, [id, navigate]);

    const { title, description, price, category } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        setNewImage(e.target.files[0]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        const listingData = new FormData();
        listingData.append('title', title);
        listingData.append('description', description);
        listingData.append('price', price);
        listingData.append('category', category);
        if (newImage) {
            listingData.append('image', newImage);
        }

        const user = JSON.parse(localStorage.getItem('user'));
        listingService.updateListing(id, listingData, user.token)
            .then(() => {
                alert('Listing updated successfully!');
                navigate('/my-listings');
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.msg || 'An unknown error occurred.';
                alert('Failed to update listing: ' + errorMessage);
            });
    };

    return (
        <div className="form-container">
            <h2>Edit Your Listing</h2>
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
                        <option value="Furniture">Furniture</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Current Image</label>
                    {currentImage && <img src={currentImage} alt="Current listing" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />}
                </div>

                <div className="form-group">
                    <label htmlFor="image">Upload New Image (Optional)</label>
                    <input 
                        type="file" 
                        id="image" 
                        name="image" 
                        accept=".jpg,.jpeg,.png" 
                        onChange={onFileChange} 
                    />
                </div>

                <button type="submit" className="form-btn">Update Listing</button>
            </form>
        </div>
    );
}

export default EditListingPage;