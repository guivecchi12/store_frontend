import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from "react-router-dom";

// Components
import Item from './ShoppingCartItem';

const ShoppingCart = () => {
	const cart = useContext(CartContext);
	const navigate = useNavigate();
	const [total, setTotal] = useState(0)

	useEffect(() => {
		setTotal(cart.reduce((acc, value) => {
			return acc + value.price;
		}, 0).toFixed(2))
	}, [cart])


	const submit = () => {
		if(cart.length > 0){
			navigate('/confirmation', {state:[total, cart]});
		}
	}

	return (
		<div className="shopping-cart">
			{cart.map(item => (
				<Item key={item.id} {...item} />
			))}

			<div className="shopping-cart__checkout">
				<p>Total: ${total}</p>
				<button onClick={submit}>Checkout</button>
			</div>
		</div>
	);
};

export default ShoppingCart;