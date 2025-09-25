import React, { useState, useEffect } from 'react';
import listingService from '../services/listingService';
import wishlistService from '../services/wishlistService';
import ListingItem from '../components/ListingItem';
import './MarketplacePage.css';

function MarketplacePage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [wishlist, setWishlist] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchListings();
        if (user) {
            fetchWishlist();
        }
    }, []);

    const fetchListings = (search = '', category = 'All') => {
        setLoading(true);
        listingService.getListings(search, category)
            .then(response => {
                setListings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch listings:', error);
                setLoading(false);
            });
    };

    const fetchWishlist = () => {
        wishlistService.getWishlist(user.token)
            .then(response => {
                setWishlist(response.data.map(item => item._id));
            })
            .catch(error => {
                console.error('Failed to fetch wishlist:', error);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchListings(searchTerm, category);
    };
    
    const handleAddToWishlist = (listingId) => {
        if (!user) {
            alert('Please login to add items to your wishlist.');
            return;
        }
        wishlistService.addToWishlist(listingId, user.token)
            .then(() => {
                setWishlist([...wishlist, listingId]);
            })
            .catch(error => {
                alert(error.response.data.msg);
            });
    };

    const handleRemoveFromWishlist = (listingId) => {
        if (!user) {
            alert('Please login to modify your wishlist.');
            return;
        }
        wishlistService.removeFromWishlist(listingId, user.token)
            .then(() => {
                setWishlist(wishlist.filter(id => id !== listingId));
            })
            .catch(error => {
                alert('Failed to remove from wishlist.');
            });
    };


    if (loading) {
        return <p>Loading listings...</p>;
    }

    return (
        <>
            <div className="welcome-header">
                <h1>Welcome to UniMarket!</h1>
                <p>Your one-stop campus marketplace.</p>
            </div>

            <main>
                <h2>Marketplace</h2>

                <form onSubmit={handleSearch} className="search-and-filter-bar">
                    <input
                        type="text"
                        placeholder="Search for items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="All">All Categories</option>
                        <option value="Textbooks">Textbooks</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                    </select>
                    <button type="submit" className="form-btn">Search</button>
                </form>

                <div className="listings-grid">
                    {listings.length > 0 ? (
                        listings.map(listing => (
                            <ListingItem 
                                key={listing._id} 
                                listing={listing}
                                onAddToWishlist={() => handleAddToWishlist(listing._id)}
                                onRemoveFromWishlist={() => handleRemoveFromWishlist(listing._id)}
                                isWishlisted={wishlist.includes(listing._id)}
                                showWishlistButton={user && user.user.id !== listing.user._id}
                            />
                        ))
                    ) : (
                        <p>No listings found for your search.</p>
                    )}
                </div>
            </main>
        </>
    );
}

export default MarketplacePage;