import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import wishlistService from '../services/wishlistService';
import ListingItem from '../components/ListingItem';
import './MarketplacePage.css';

function WishlistPage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            navigate('/login');
            return;
        }

        wishlistService.getWishlist(user.token)
            .then(response => {
                setListings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch wishlist:', error);
                setLoading(false);
            });
    }, [navigate]);
    
    const handleRemoveFromWishlist = (listingId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        wishlistService.removeFromWishlist(listingId, user.token)
            .then(() => {
                setListings(listings.filter(listing => listing._id !== listingId));
            })
            .catch(error => {
                alert('Failed to remove from wishlist.');
            });
    };

    if (loading) {
        return <p>Loading your wishlist...</p>;
    }

    return (
        <main>
            <h2>My Wishlist</h2>
            <div className="listings-grid">
                {listings.length > 0 ? (
                    listings.map(listing => (
                        <ListingItem 
                            key={listing._id} 
                            listing={listing} 
                            onRemoveFromWishlist={() => handleRemoveFromWishlist(listing._id)}
                            isWishlisted={true}
                            showWishlistButton={true}
                        />
                    ))
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </main>
    );
}

export default WishlistPage;