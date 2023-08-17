import React, { useState, useEffect, } from 'react';
import CardShop from '../components/CardShop';
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='container py-10'>
            <div className="product_list">
                <CardShop products={products} />
            </div>
        </div>
    );
}

export default Home;
