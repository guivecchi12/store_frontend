import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	const cart  = useContext(CartContext);
	return (
		<div className="navigation">
			<NavLink to="/">Products</NavLink>
			<NavLink to="/cart">
				Cart <span>{cart.length}</span>
			</NavLink>
			<NavLink to="/login" className={"a_login"}>Login</NavLink>
		</div>
	);
};

export default Navigation;