import React, { useState, useEffect } from 'react'
import axios from 'axios'
import data from '../data'
const Orders = () => {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState({})

    const api = process.env.REACT_APP_API || ''

    

    useEffect(() => {
		// axios
		// 	.get(api + '/api/ordered_item/user')
        //     .then(res => {
        //         setOrders(organizeOrders(res.data))
        //         console.log("*** ORDERS ***", orders)
        //     })
        //     .catch(err => {
        //         setError({error: err, message: 'unable to find orders'})
        //     })
        organizeOrders(data)
	}, [])

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

    // const mapOrder = (order) => {
    //     orders[order].map(item => {
    //         return (
    //             <div className='item'>
    //                 <h3>Title: {item.title}</h3>
    //                 <h3>Price: ${item.unit_price.toFixed(2)}</h3>
    //                 <h3>Quantity: {item.quantity}</h3>
    //             </div>
    //         )
    //     })
    // }
    // const ordersDrill = () => {  
    //     return {
    //         for(var order in orders){
    //             console.log(`Order ${order}: `, orders[order][0])
    //             return(
    //                 <div className='order'>
    //                     {mapOrder(order)}
    //                     <div className='order_info'>
    //                         <h3>Total: ${orders[order][0].total_cost.toFixed(2)}</h3>
    //                         <h3>Date Ordered: {orders[order][0].order_date}</h3>
    //                         <h3>{orders[order][0].paid? "Status: Shipping" : "Status: Awaiting payment"}</h3>
    //                     </div>
    //                 </div>
    //             )
    //         }
    //     }
        
    // }
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
        return( size > 0 ? ordersDrill() : <h3 className='no_orders'>No orders have been made</h3> )
    }


    return(
        <div className='order_history'>
            <h1>Welcome to your Order History Page</h1>
            <div className='orders'>{displayOrders()}</div>
        </div>
    )
}

export default Orders;