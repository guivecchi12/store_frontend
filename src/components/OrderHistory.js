import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import data from '../data'
import { UserContext } from '../contexts/UserContext'
const Orders = () => {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState({})
    const { loggedIn } = useContext(UserContext);

    useEffect(() => {
        if(loggedIn){
            axios
			.get('http://localhost:3001/api/ordered_item/user')
            .then(res => {
                organizeOrders(res.data)
                setError({})
            })
            .catch(err => {
                setError({error: err, message: 'No orders have been found'})
                console.log("Error while getting your orders: ", error)
            })
        }
        else{
            setError({message: "Please login to see your order history"})
        }
	}, [loggedIn])

    const organizeOrders = (data) => {
        const organized = {}
        for(var key in data){
            const order_num = data[key].order_number

            if(order_num in organized){
                organized[order_num] = [...organized[order_num], data[key]]
            }
            else{
                organized[order_num] = [data[key]]
            }
        }
        setOrders(organized)
    }

    
    const ordersDrill = () => {
        return(
            Object.keys(orders).map(order => {
                return(
                    <div className='order'>
                        <h3 id="order_num">Order Number: {orders[order][0].order_number}</h3>
                        {orders[order].map(item => {
                            return(
                                <div className='item'>
                                    <h3>Title: {item.title}</h3>
                                    <h3>Price: ${item.unit_price.toFixed(2)}</h3>
                                    <h3>Quantity: {item.quantity}</h3>
                                </div>
                             )
                        })}

                        <div className='order_info'>
                            <h3>Total: ${orders[order][0].total_cost.toFixed(2)}</h3>
                            <h3>Date Ordered: {orders[order][0].order_date}</h3>
                            <h3>{orders[order][0].paid? "Status: Shipping" : "Status: Awaiting payment"}</h3>
                        </div>
                    </div>
                )
            })
        )
    }
    const displayOrders = () => {
        const size = Object.keys(orders).length
        return( size > 0 ? ordersDrill() : <h3 className='no_orders'>{error.message}</h3> )
    }


    return(
        <div className='order_history'>
            <h1>Welcome to your Order History Page</h1>
            <div className='orders'>{displayOrders()}</div>
        </div>
    )
}

export default Orders;