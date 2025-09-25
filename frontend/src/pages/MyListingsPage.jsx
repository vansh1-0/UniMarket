import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import listingService from '../services/listingService';
import ListingItem from '../components/ListingItem';
import './MarketplacePage.css';

function MyListingsPage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            navigate('/login');
            return;
        }

        listingService.getMyListings(user.token)
            .then(response => {
                setListings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch user listings:', error);
                setLoading(false);
            });
    }, [navigate]);

    const handleDelete = (listingId) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            const user = JSON.parse(localStorage.getItem('user'));
            listingService.deleteListing(listingId, user.token)
                .then(() => {
                    setListings(listings.filter(listing => listing._id !== listingId));
                    alert('Listing deleted successfully.');
                })
                .catch(error => {
                    alert('Failed to delete listing.');
                    console.error(error);
                });
        }
    };

    if (loading) {
        return <p>Loading your listings...</p>;
    }

    return (
        <main>
            <h2>My Listings</h2>
            <div className="listings-grid">
                {listings.length > 0 ? (
                    listings.map(listing => (
                        <ListingItem 
                            key={listing._id} 
                            listing={listing} 
                            showDeleteButton={true} 
                            onDelete={() => handleDelete(listing._id)}
                        />
                    ))
                ) : (
                    <p>You have not posted any listings yet.</p>
                )}
            </div>
        </main>
    );
}

export default MyListingsPage;