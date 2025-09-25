import React from 'react';
import './ListingItem.css';

function ListingItem({ listing }) {
    // Construct the full image URL by prepending the backend server's address
    const imageUrl = `http://localhost:5000${listing.image}`;

    return (
        <div className="listing-card">
            <img 
                src={imageUrl} 
                alt={listing.title} 
                className="listing-image" 
                // Add a fallback for broken images
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/250?text=No+Image"; }}
            />
            <div className="listing-details">
                <h3 className="listing-title">{listing.title}</h3>
                <p className="listing-price">₹{listing.price}</p>
                <p className="listing-category">{listing.category}</p>
                <p className="listing-seller">Sold by: {listing.user.name}</p>
            </div>
        </div>
    );
}

export default ListingItem;