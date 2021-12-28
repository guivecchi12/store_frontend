import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

import { CartContext } from '../contexts/CartContext'
import { ProductContext } from '../contexts/ProductContext'

import Item from './ShoppingCartItem'

const ShoppingCart = () => {
	const cart = useContext(CartContext)
	const { clearCart } = useContext(ProductContext)

	// const api = process.env.REACT_APP_API || ''

	const navigate = useNavigate()
	const [total, setTotal] = useState(0)
	const [order, setOrder] = useState()

	
	useEffect(() => {
		setTotal(cart.reduce((acc, value) => {
			return acc + value.price;
		}, 0).toFixed(2))
		
		
		const userID = localStorage.getItem('userID') || 1
		const my_order = {
			"userID": userID,
			"total_cost": total,
			"paid": true
		}

		console.log("MY Order: ", my_order)
		// create order
		axios
			.post('/api/order', my_order)
			.then(res => {
				console.log("RES: ", res)
				setOrder(res.data[0])
				console.log("Data[0]: ", res.data[0], "\nData: ", res.data)
				console.log(order)
			})
			.catch(err => console.log(err))	
		
		console.log("ORDER: ", order)
	}, [cart, order, total])

	// Create new order
	
	const addItems = () => {
		cart.forEach(item => {
			
			const ordered_item = {
				"order": order,
				"inventory_sku": item.id,
				"quantity_ordered": 1
			}

			axios
				.post('/api/ordered_item/', ordered_item)
				.then(res => console.log(res.data))
				.catch(err => console.log(err))
		})
	}

	const submit = () => {
		if(cart.length > 0){
			const t = total
			const c = cart

			addItems()
			clearCart()
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