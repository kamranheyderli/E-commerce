// hooks
import { useState, useEffect } from 'react';
// react_icons
import { SlBasket } from "react-icons/sl";
import { GrClose } from "react-icons/gr";
// redux_toolkit
import { removeItem,initializeCartFromLocalStorage  } from '../redux/root/addToCardSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {

        dispatch(initializeCartFromLocalStorage());
    }, [dispatch]);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const removeFromCartHandler = (product) => {
        dispatch(removeItem(product.id));

        const updatedCartItems = cartItems.filter(item => item.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));

        if (updatedCartItems.length === 0) {
            setIsSidebarOpen(false);
        }
        if (totalQuantity === 0) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <>
            <header>
                <div className="container">
                    <div className="logo">
                        <img src="/images/maxresdefault.jpg" alt="" />
                    </div>
                    <div className="right_navbar">
                        <div className="relative">
                            <span className='absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center	justify-center	'>{totalQuantity}</span>
                            <SlBasket className='basket' onClick={toggleSidebar} />
                        </div>
                    </div>

                    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                        <div className="sidebar_head">

                            <div className="total_price">
                                <h2> Total Price:</h2><span>{totalPrice.toFixed(2)}</span>
                            </div>
                            <GrClose style={{ fontSize: "25px", marginRight: "10px", marginTop: "10px" }} onClick={toggleSidebar} />
                        </div>

                        {
                            cartItems.map((product => {
                                return (
                                    <div key={product.id} className='card_shop'>
                                        <div className="card_img">
                                            <img src={product.image} alt="" />
                                        </div>
                                        <div className="card_info">
                                            <h2>{product.title.slice(0, 10)}</h2>
                                            <h3>{product.description.slice(0, 10)}</h3>

                                            <div className="button">
                                                <span>{product.price}$</span>
                                                <button onClick={() => removeFromCartHandler(product)}>Remove</button>
                                            </div>
                                        </div>
                                        <div className="item_count ">
                                            <p>Product Number:</p><span>{product.count}</span>
                                        </div>
                                    </div>
                                )
                            }))
                        }

                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar;
