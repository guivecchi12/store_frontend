import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Context
import { ProductContext } from "./contexts/ProductContext"
import { CartContext } from './contexts/CartContext'
import { UserContext } from './contexts/UserContext'

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import Login from './components/Login';
import OrderConfirmation from './components/OrderConfirmation'
import { date } from 'yup';


function App() {
	const [products, setProducts] = useState([])
	const [cart, setCart] = useState([])
	const [user, setUser] = useState([])

	const api = process.env.REACT_APP_API || ''

	useEffect(() => {
		axios
			.get(api + "/api/inventory")
			.then(res => {
				setProducts(res.data)
			})
			.catch(err => console.log(err))
	}, [])

	const addItem = item => {
		item = {...item, my_key: Date.now()}
		setCart(oldCart => [...oldCart, item]);
	};
	
	// remove item from cart
	const removeItem = item => {
		console.log("MY Cart Before: ", cart)
		setCart(cart.filter(items => items.my_key !== item.my_key));
		console.log("MY Cart After: ", cart)
	};

	// clear cart
	const clearCart = () => {
		setCart([])
	}

	const logout = () => {
		axios
			.get(api + "/api/user/logout")
			.then((res) => {
				console.log(res)
				setUser([])
			})
			.catch(err => console.log(err))
	}

	return (
		<div className="App">
			<UserContext.Provider value={{ user, setUser, logout }}>
				<ProductContext.Provider value = {{ products, addItem, removeItem, clearCart }}>
					<CartContext.Provider value = {cart}>
						<Navigation />
						<Routes>
							<Route exact path="/" element={<Products />}/>
							<Route path="/cart" element={<ShoppingCart />}/>
							<Route path="/login" element={<Login />}/>
							<Route path='/confirmation' element={<OrderConfirmation/>}/>
						</Routes>
					</CartContext.Provider>
				</ProductContext.Provider>
			</UserContext.Provider>
		</div>
	);
}

export default App;