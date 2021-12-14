import React from 'react';

const Product = props => {
	return (
		<div className="product">
			<img src={props.product.image} alt={`${props.product.title} book`} />

			<div className="productInfo">
				<h1 className="title">{props.product.title}</h1>

				<p className="price">${(Math.round(props.product.price * 100) / 100).toFixed(2)}</p>

				<button onClick={() => props.addItem(props.product)}>
					Add to cart
				</button>
			</div>
			
		</div>
	);
};

export default Product;