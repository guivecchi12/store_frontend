import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import Login from './components/Login';
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from './contexts/CartContext';
import axios from 'axios';

function App() {
	const [products, setProducts] = useState(data);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		axios
			.get('https://my-cool-book-store.herokuapp.com/api/inventory')
			.then(res => {
				console.log("Axios received: ", res)
				// setProducts(res.data)
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

	return (
		<div className="App">
		<ProductContext.Provider value = {{ products, addItem, removeItem }}>
			<CartContext.Provider value = { cart }>
				<Navigation />
				<Routes>
					<Route exact path="/" element={<Products />}/>
					<Route path="/cart" element={<ShoppingCart />}/>
					<Route path="/login" element={<Login />}/>
				</Routes>
			</CartContext.Provider>
		</ProductContext.Provider>
	</div>
	);
}

export default App;