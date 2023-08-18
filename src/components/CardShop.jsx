import React from 'react';
// react_hooks
import { useNavigate } from "react-router-dom";
// redux_toolkit
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/root/addToCardSlice';


const CardShop = ({ products }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openDetails = (e, id) => {
        e.preventDefault()
        navigate(`/details/${id}`);

    };

    const addToCartHandler = (product) => {
        dispatch(addItem(product));
    };

    return (
        <>
            <div key={products.id} className='card_shop'>
                <div onClick={e => openDetails(e, products.id)} className="card_img">
                    <img src={products.image} alt="" />
                </div>
                <div className="card_info">
                    <h2>{products.title.slice(0, 10)}</h2>
                    <h3>{products.description.slice(0, 10)}</h3>

                    <div className="button">
                        <span>{products.price}$</span>
                        <button onClick={() => addToCartHandler(products)}>Add To Card</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardShop;
