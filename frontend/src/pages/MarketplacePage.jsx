import React, { useState, useEffect } from 'react';
import listingService from '../services/listingService';
import ListingItem from '../components/ListingItem';
import './MarketplacePage.css';

function MarketplacePage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listingService.getListings()
            .then(response => {
                setListings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch listings:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading listings...</p>;
    }

    return (
        <main>
            <h2>Marketplace</h2>
            <div className="listings-grid">
                {listings.length > 0 ? (
                    listings.map(listing => (
                        <ListingItem key={listing._id} listing={listing} />
                    ))
                ) : (
                    <p>No listings found.</p>
                )}
            </div>
        </main>
    );
}

export default MarketplacePage;