import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import Login from './components/Login';
import OrderConfirmation from './components/OrderConfirmation';
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from './contexts/CartContext';
import axios from 'axios';

function App() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		axios
			.get("https://my-cool-book-store.herokuapp.com/api/inventory")
			.then(res => {
				setProducts(res.data)
				console.log(products)
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

	return (
		<div className="App">
		<ProductContext.Provider value = {{ products, addItem, removeItem, clearCart }}>
			<CartContext.Provider value = { cart }>
				<Navigation />
				<Routes>
					<Route exact path="/" element={<Products />}/>
					<Route path="/cart" element={<ShoppingCart />}/>
					<Route path="/login" element={<Login />}/>
					<Route path='/confirmation' element={<OrderConfirmation/>}/>
				</Routes>
			</CartContext.Provider>
		</ProductContext.Provider>
	</div>
	);
}

export default App;