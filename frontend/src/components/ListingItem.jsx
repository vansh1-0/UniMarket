import React from 'react';
import './ListingItem.css';

function ListingItem({ listing, showDeleteButton, showEditButton, onDelete, onEdit }) {
    const imageUrl = `http://localhost:5000${listing.image}`;

    return (
        <div className="listing-card">
            <img 
                src={imageUrl} 
                alt={listing.title} 
                className="listing-image" 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/250?text=No+Image"; }}
            />
            <div className="listing-details">
                <h3 className="listing-title">{listing.title}</h3>
                <p className="listing-price">₹{listing.price}</p>
                <p className="listing-category">{listing.category}</p>
                <p className="listing-seller">Sold by: {listing.user.name}</p>
                
                {showEditButton && (
                    <button onClick={onEdit} className="edit-button">
                        Edit
                    </button>
                )}
                {showDeleteButton && (
                    <button onClick={onDelete} className="delete-button">
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}

export default ListingItem;