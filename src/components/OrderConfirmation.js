import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import { ProductContext } from '../contexts/ProductContext'

const OrderConfirmation = () => {
    const { clearCart } = useContext(ProductContext)
    const total = useLocation().state[0]
    const items = useLocation().state[1]
    const [order, setOrder] = useState()

    useEffect(() => {
        createOrder()
        addItems()
        clearCart()
    }, [])

    const createOrder = () => {
        const userID = localStorage.getItem('userID') || 1
		const my_order = {
			"userID": userID,
			"total_cost": total,
			"paid": true
		}

        axios
            .post('/api/order', my_order)
            .then(res => {
                setOrder(res.data[0])
            })
            .catch(err => console.log(err))
    }
    const addItems = () => {
		items.forEach(item => {
			
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

    const salesTax = () => {
        return (total * .047).toFixed(2)
    }

    const totalPurchase = () => {
        return (parseFloat(salesTax()) + parseFloat(total)).toFixed(2)
    }

    const displayItems = () => {
        return items.map(item => {
            return(
                <div className='confirmationItems'>
                    <p><span className='orderBold'>Product: </span>{item.title}</p>
                    <p><span className='orderBold'>Price: </span>${item.price.toFixed(2)}</p>
                </div>
            )
        });
    }

    return(
        <div className='orderConfirmation'>
            <div className='orderBox'>
                <h1 className='orderPlaced'>Your order has been placed.</h1>
                <div className='orderInfo'>
                    <div className='orderSummary'>
                        <h3>Order Summary</h3>
                        <div className='orderFlex'>
                            <p><span className='orderBold'>Product Cost:</span></p>
                            <p>$ {total}</p>
                        </div>
                        <div className='orderFlex'>
                            <p><span className='orderBold'>Taxes: </span></p>
                            <p>$ {salesTax()}</p>
                        </div>
                        <div className='orderFlex'>
                            <p><span className='orderBold'>Total: </span></p>
                            <p>$ {totalPurchase()}</p>
                        </div>
                    </div>

                    <div className='lineBreak'/>

                    <div className='orderItems'>
                        <h3>Items</h3>
                        <div>
                            {displayItems()}
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default OrderConfirmation;