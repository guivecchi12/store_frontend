import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	const cart  = useContext(CartContext);
	const {user, logout} = useContext(UserContext);

	return (
		<div className="navigation">
			<div className='userName'>{user}</div>
			<NavLink to='/orders'>Orders</NavLink>
			<NavLink to="/">Products</NavLink>
			<NavLink to="/cart" className={'cart'}>
				Cart <span>{cart.length}</span>
			</NavLink>
			{user.length > 0 ? 
				<button onClick={logout} className={"a_login"}>Logout</button> 
				: <NavLink to="/login" className={"a_login"}>Login</NavLink>
			}
		</div>
	);
};

export default Navigation;