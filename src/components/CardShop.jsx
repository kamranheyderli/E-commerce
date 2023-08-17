import React from 'react';
import { useNavigate } from "react-router-dom";
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
            {
                products.map((product => {
                    return (
                        <div key={product.id} className='card_shop'>
                            <div onClick={e => openDetails(e, product.id)} className="card_img">
                                <img src={product.image} alt="" />
                            </div>
                            <div className="card_info">
                                <h2>{product.title.slice(0, 10)}</h2>
                                <h3>{product.description.slice(0, 10)}</h3>

                                <div className="button">
                                    <span>{product.price}$</span>
                                    <button onClick={() => addToCartHandler(product)}>Add To Card</button>
                                </div>
                            </div>
                        </div>
                    )
                }))
            }
        </>
    )
}

export default CardShop;
