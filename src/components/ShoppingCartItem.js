import React, {useContext} from 'react';
import {ProductContext} from '../contexts/ProductContext';
const Item = props => {
	// console.log("My props in shopping cart", props);
	const { removeItem } = useContext(ProductContext);
	// console.log(removeItem);
	return (
		<div className="shopping-cart_item">
			<img src={props.image} alt={`${props.title} book`} />


			<div>
				<h1>{props.title}</h1>
				<p>$ {props.price}</p>
				<button onClick={() => removeItem(props)}>Remove from cart</button>
			</div>
		</div>
	);
};

export default Item;