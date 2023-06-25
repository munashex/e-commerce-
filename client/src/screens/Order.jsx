import axios from 'axios'
import {useEffect, useContext, useState, useReducer} from 'react'  
import { useParams, useNavigate, Link } from 'react-router-dom' 
import { Store } from '../store' 
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { getError } from '../utils/Error' 
import {toast} from 'react-toastify'


const reducer = (state, action) => {
switch(action.type) {
    case 'PAY_REQUEST': 
    return {...state, loadingPay: true}  
    case 'PAY_SUCCESS': 
    return {...state, loadingPay: false, successPay: true};
    case 'PAY_FAIL': 
    return {...state, loadingPay: false} 
    case 'PAY_RESET': 
    return {...state, loadingPay: false, successPay: false}
    default: 
    return state
}
}


const Order = () => {
   
    const {id} = useParams()
    const navigate = useNavigate()
    const [{loadingPay, successPay}, dispatch] = useReducer(reducer, {loadingPay:false, successPay:false})
    const {state: {cart},} = useContext(Store)  
    const [orders, setOrders] = useState({})  
    const {userInfo} = cart     
   
 
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

    useEffect(() => {
        if(!userInfo) {
            return navigate('/signup')
        }
    const fetchOrder = async () => {
    const results = await axios.get(`http://localhost:3000/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
    setOrders(results.data)  
}
if(!orders._id || successPay || (orders._id && orders._id !== id)) {
    fetchOrder() 
    if(successPay) {
        dispatch({type: 'PAY_RESET'})
    }
}else { 
    const loadPaypalScript = async() => {
   const {data: clientId} = await axios.get('http://localhost:3000/api/keys/paypal', {
    headers: {
        Authorization: `Bearer ${userInfo.token}`
    }
   })
   paypalDispatch({
    type: 'resetOptions', 
    value: {
        'clientId': clientId, 
        currency: 'USD'
    }
   })
   paypalDispatch({type: 'setLoadingStatus', value: 'pending'})
    }
    loadPaypalScript()
}
    }, [orders, userInfo, navigate, paypalDispatch, successPay])

   
    function createOrder(data, actions) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: { value: orders.orderItems },
              },
            ],
          })
          .then((orderID) => {
            return orderID;
          });
      }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
            dispatch({type: 'PAY_REQUEST'});
            const {data} = await axios.put(
                `http://localhost:3000/api/orders/${orders._id}/pay`, 
                details, {
                    Authorization: `Bearer ${userInfo.token}`
                }
            )
            dispatch({type: 'PAY_SUCCESS', payload: data}) 
            toast.success("Order is Paid")
            }catch(err) {
                dispatch({type: 'PAY_FAIL', payload:getError(err)}) 
                toast.error(getError(err))
            }
        })
    }

    function onError(err) {
     toast.error(getError(err))
    }

    return (
<div className="flex mb-10 flex-col lg:flex-row space-y-6 lg:space-y-0 mt-6 items-start">
   <div className="flex flex-col space-y-6  mx-auto w-[90%] lg:w-[60%]">
   
   <div className="border p-3 border-slate-400 rounded-md">
        <h1 className="text-lg font-semibold">Shipping</h1> 
         <div className="bg-red-200 rounded-md p-2 mt-3 text-red-600">
            {orders.isDelivered ? 'Delivered' : 'Not Delivered'}
         </div> 

    </div> 

    <div  className="border p-3 border-slate-400 rounded-md">
    <h1 className="text-lg font-semibold">Payment</h1>  
    <h1><strong>method: </strong> {orders.paymentMethod}</h1> 
    <div className="bg-red-200 rounded-md p-2 mt-3 text-red-600">
            {orders.isPaid ? 'Paid' : 'Not Paid'}
         </div>
    </div> 

   
    <div className="border p-2 border-slate-400 flex flex-col 
          space-y-4
          rounded-md
          divide-y divide-slate-400">
           {orders.orderItems && orders.orderItems.map((product) => (
            <div key={product.slug} className="flex flex-col lg:flex-row  lg:items-center justify-between px-6"> 
             <div className="flex items-center"> 
             <img src={product.image} alt={product.name}  
            className="h-24 border border-slate-400 shadow-md rounded-md"
            /> 
            <Link to={`/product/${product.slug}`}  
            className="text-[blue] underline mx-1"
            >{product.name}</Link> 
             </div>
            <h1><strong>quantity</strong> {product.quantity}</h1> 
            <h1><strong>price</strong> ${product.price * product.quantity}</h1> 
            </div>
           ))} 
          </div>

   </div> 

   <div className="flex flex-col w-[90%] lg:w-[20%] h-max divide-y divide-slate-400 space-y-2
         lg:h-max mx-auto border border-slate-400  rounded-md p-4" >
    <h1>Order Summary</h1> 
    
    <div className="flex justify-between"> 
            <h1>Items</h1> 
            <h1>${orders.totalPrice}</h1>
 </div>  

 <div className="flex justify-between"> 
            <h1>Shipping</h1> 
            <h1>${orders.shippingPrice}</h1>
          </div>  

          <div className="flex justify-between"> 
            <h1>Tax</h1> 
            <h1>${orders.taxPrice}</h1>
          </div>    

          <div className="flex justify-between font-bold"> 
            <h1>Order Total</h1> 
            <h1>${orders.itemsPrice}</h1>
          </div>  

          {!orders.isPaid && (
            <div> 
                {isPending ? (
                    <h1 className="mt-2">Loading...</h1>
                ): (<div className="mt-3"> 
                    <PayPalButtons 
                    createOrder={createOrder} 
                    onApprove={onApprove} 
                     onError={onError}
                    >

                    </PayPalButtons> 
                    {loadingPay && <h1>loading...</h1>}
                </div>)}
            </div>
          )} 


   </div>
</div>

    )
}

export default Order