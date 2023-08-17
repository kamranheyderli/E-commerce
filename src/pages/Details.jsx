import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Details = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setData(response.data))
            .catch(error => console.error('ERRORR:', error));
    }, []);

    const { image, description, price, title, place } = data;

    return (

        <div className='container'>
            <div className="details_wrapper">
                <div className="details_image">
                    <img src={image} alt="" />
                </div>
                <div className="details_info py-10">
                    <div className="details_text py-5">
                        <h2>{title}</h2>
                        <h3>{description}</h3>
                    </div>
                    <div className="button">
                        <span>{price}$</span>
                        <button onClick={() => navigate("/")}>Home Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;
