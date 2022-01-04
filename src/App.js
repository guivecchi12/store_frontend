import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Context
import { ProductContext } from "./contexts/ProductContext"
import { CartContext } from './contexts/CartContext'
import { UserContext } from './contexts/UserContext'

// Components
import Navigation from './components/Navigation'
import Products from './components/Products'
import ShoppingCart from './components/ShoppingCart'
import Login from './components/Login'
import Orders from './components/OrderHistory'
import OrderConfirmation from './components/OrderConfirmation'


function App() {
	const [products, setProducts] = useState([])
	const [cart, setCart] = useState([])
	const [user, setUser] = useState([])
	const [error, setError] = useState()
	const [loggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		axios
			.get("http://localhost:3001/api/inventory/")
			.then(res => {
				setProducts(res.data)
				setError()
			})
			.catch(() => {
				setError("Error when loading books")
			})
	}, [])

	const addItem = item => {
		item = {...item, my_key: Date.now()}
		setCart(oldCart => [...oldCart, item]);
	};
	
	// remove item from cart
	const removeItem = item => {
		setCart(cart.filter(items => items.my_key !== item.my_key));
	};

	// clear cart
	const clearCart = () => {
		setCart([])
	}

	const logout = () => {
		axios
			.get("http://localhost:3001/api/user/logout")
			.then(() => {
				setUser([])
				localStorage.clear()
				setError()
				setLoggedIn(false)
			})
			.catch(() => {
				setError('Error during logout, please re-load and try again')
			})
	}

	return (
		<div className="App">
			<UserContext.Provider value={{ user, loggedIn, setLoggedIn, setUser, logout }}>
				<ProductContext.Provider value = {{ products, addItem, removeItem, clearCart }}>
					<CartContext.Provider value = {cart}>
						<Navigation />
						{ error? <div className='error'>Error: {error}</div> : null}
						<Routes>
							<Route exact path="/" element={<Products />}/>
							<Route path="/cart" element={<ShoppingCart />}/>
							<Route path="/login" element={<Login />}/>
							<Route path="/orders" element={<Orders/>}/>
							<Route path='/confirmation' element={<OrderConfirmation/>}/>
						</Routes>
					</CartContext.Provider>
				</ProductContext.Provider>
			</UserContext.Provider>
		</div>
	);
}

export default App;