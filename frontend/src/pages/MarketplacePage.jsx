import React, { useState, useEffect } from 'react';
import listingService from '../services/listingService';
import ListingItem from '../components/ListingItem';
import './MarketplacePage.css';

function MarketplacePage() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        fetchListings();
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

    const handleSearch = (e) => {
        e.preventDefault();
        fetchListings(searchTerm, category);
    };

    if (loading) {
        return <p>Loading listings...</p>;
    }

    return (
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
                        <ListingItem key={listing._id} listing={listing} />
                    ))
                ) : (
                    <p>No listings found for your search.</p>
                )}
            </div>
        </main>
    );
}

export default MarketplacePage;