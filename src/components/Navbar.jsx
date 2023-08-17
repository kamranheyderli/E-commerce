import { useState, useEffect } from 'react'; // useState'ı içe aktarın
import { SlBasket } from "react-icons/sl";
import { removeItem } from '../redux/root/addToCardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from "react-icons/gr"
const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        dispatch({ type: 'cart/setCartItems', payload: storedCartItems });
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const removeFromCartHandler = (product) => {
        dispatch(removeItem(product.id));

        const updatedCartItems = cartItems.filter(item => item.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
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
                            <h2>Basket</h2>
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
                                        <div className="button_group flex">
                                            <button>-</button>
                                            <span>0</span>
                                            <button>+</button>
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
