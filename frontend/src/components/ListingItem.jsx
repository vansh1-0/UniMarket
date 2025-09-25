import React from 'react';
import './ListingItem.css';

function ListingItem({ listing }) {
    return (
        <div className="listing-card">
            <img 
                src="https://via.placeholder.com/150" 
                alt={listing.title} 
                className="listing-image" 
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