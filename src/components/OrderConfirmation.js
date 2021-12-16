import React from 'react';
import { useLocation } from 'react-router';

const OrderConfirmation = () => {
    const total = useLocation().state[0];
    const items = useLocation().state[1];

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
                    <p><span className='orderBold'>Price: </span>{item.price}</p>
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
                            <p>{total}</p>
                        </div>
                        <div className='orderFlex'>
                            <p><span className='orderBold'>Taxes: </span></p>
                            <p>{salesTax()}</p>
                        </div>
                        <div className='orderFlex'>
                            <p><span className='orderBold'>Total: </span></p>
                            <p>{totalPurchase()}</p>
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