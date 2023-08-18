// hooks
import React, { useState, useEffect, } from 'react';
// components
import CardShop from '../components/CardShop';
// axios
import axios from 'axios';
// react_paginate
import ReactPaginate from  "react-paginate";
const Home = () => {
    const [products, setProducts] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);

    const itemsPerPage = 6;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='container py-10'>
            <div className="product_list">
                {
                    currentItems.map((products,i) => (
                        <CardShop key={i} products={products} />
                    ))
                }
            </div>
            <ReactPaginate
                className='paginate'
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default Home;
