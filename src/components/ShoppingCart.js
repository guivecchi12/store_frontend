import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

import { CartContext } from '../contexts/CartContext'


import Item from './ShoppingCartItem'

const ShoppingCart = () => {
	const cart = useContext(CartContext)

	// const api = process.env.REACT_APP_API || ''

	const navigate = useNavigate()
	const [total, setTotal] = useState(0)

	useEffect(() => {
		setTotal(cart.reduce((acc, value) => {
			return acc + value.price;
		}, 0).toFixed(2))
	}, [cart])

	

	const submit = () => {
		if(cart.length > 0){
			const t = total
			const c = cart
			navigate('/confirmation', {state:[t, c]})
		}
	}

	return (
		<div className="shopping-cart">
			{cart.map(item => (
				<Item key={item.my_key} {...item} />
			))}

			<div className="shopping-cart__checkout">
				<p>Total: ${total}</p>
				<button onClick={submit}>Checkout</button>
			</div>
		</div>
	);
};

export default ShoppingCart;