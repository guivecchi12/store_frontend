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




function App() {
	const [products, setProducts] = useState([])
	const [cart, setCart] = useState([])
	const [user, setUser] = useState([])

	useEffect(() => {
		axios
			.get("https://my-cool-book-store.herokuapp.com/api/inventory")
			.then(res => {
				setProducts(res.data)
			})
			.catch(err => console.log(err))
	}, [])

	// add the given item to the cart
	const addItem = item => {
		if(!cart.includes(item)){
			setCart(oldCart => [...oldCart, item]);
		}
	};
	
	// remove item from cart
	const removeItem = item => {
		setCart(cart.filter(items => items.id !== item.id));
	};

	// clear cart
	const clearCart = () => {
		setCart([])
	}

	const logout = () => {
		axios
			.get("https://my-cool-book-store.herokuapp.com/api/user/logout")
			.then(res => {
				console.log("logged out");
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