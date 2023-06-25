import { Helmet } from "react-helmet-async" 
import CheckOutSteps from "../components/checkOutSteps" 
import { Store } from "../store" 
import {useContext} from 'react' 
import { Link } from "react-router-dom" 
import { useEffect, useReducer } from "react" 
import { useNavigate } from "react-router-dom"   
import {getError} from '../utils/Error' 
import {toast} from 'react-toastify' 
import axios from 'axios'


const reducer = (state, action) => {
    switch(action.type) {
        case "CREATE_REQUEST":  
        return {...state, loading: true}  
        case 'CREATE_SUCCESS':  
        return {...state, loading: false} 
        case 'CREATE_FAIL':  
        return {...state, loading: false}
        default: 
        return state
    }
}

const PlaceOrder = () => {  

    const navigate = useNavigate()

const [{loading}, dispatch] = useReducer(reducer, {loading: false}) 


const {state: {cart}, dispatch: ctxDispatch} = useContext(Store) 
const {shippingAddress, paymentMethod, cartItems, userInfo} = cart   





const totalPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0) 
const totalQ = cartItems.reduce((a, c) => a + c.quantity, 0) 
const  taxPrice =  totalQ + (totalPrice / 15)
const shipping = totalPrice < 10 ? 0 : 10  * totalQ
const orderTotal = totalPrice + tax  + shipping

const PlaceorderHandler = async () => {
try{
dispatch({type: 'CREATE_REQUEST'}) 
const {data} = await axios.post('http://localhost:3000/api/orders', {
    orderItems: cartItems, 
    shippingAddress: shippingAddress, 
    paymentMethod: paymentMethod, 
    itemsPrice: Math.round(orderTotal), 
    shippingPrice: Math.round(shipping), 
    taxPrice: Math.round(taxPrice), 
    totalPrice: Math.round(totalPrice)
},{
    headers: {
        Authorization: `Bearer ${userInfo.token}`
    }
})


ctxDispatch({ type: 'CART_CLEAR' });
dispatch({ type: 'CREATE_SUCCESS' });
localStorage.removeItem('cartItems');
navigate(`/order/${data.order._id}`);
}catch(err) {
    dispatch({type: 'CREATE_FAIL'}) 
    toast.error(getError(err))
}
}

    
return (
    <div className="mt-4 mb-9"> 
     <Helmet>
        <title>place order</title>
     </Helmet> 
     <CheckOutSteps step1 step2 step3 step4/>   

     <h1 className="text-2xl mt-5 text-center fans-sans">Preview Order</h1> 

     <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0">

     <div className="mt-4 flex flex-col space-y-6  mx-auto w-[90%] lg:w-[60%]">  

          <div className="border p-2 border-slate-400 rounded-md">
           {/* shipping */} 
           <h1 className="text-lg font-semibold">Shipping</h1>  
           <h1><strong>Name: </strong>{shippingAddress.fullName}</h1>  

           <h1><strong>Adress </strong>
           {shippingAddress.address} {" "}
           {shippingAddress.city} {" "}
            {shippingAddress.postalCode} {" "}
            {shippingAddress.country}
            </h1>   
            <Link to="/shipping" className="text-[blue] underline" >Edit</Link>
          </div>  

          <div className="border p-2 border-slate-400 rounded-md">
          <h1 className="text-lg font-semibold">Payment</h1> 
          <h1><strong>Method: </strong>{paymentMethod}</h1>  
          <Link to="/payment" className="text-[blue] underline" >Edit</Link>
          </div> 

          <div className="border p-2 border-slate-400 flex flex-col 
          space-y-4
          rounded-md
          divide-y divide-slate-400">
           {cartItems.map((product) => (
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
            <Link to="/cart"
             className="text-[blue] underline" 
             >Edit</Link>
          </div>

        </div>
         


         <div className="flex flex-col w-[90%] lg:w-[20%] h-max divide-y divide-slate-400 space-y-2
         lg:h-max mx-auto border border-slate-400 rounded-md p-4" > 
         
         {/* order summary */}
         <h1 className="text-lg font-semibold">Order Summary</h1>  
          <div className="flex justify-between"> 
            <h1>Items</h1> 
            <h1>${totalPrice}</h1>
          </div>  

          <div className="flex justify-between"> 
            <h1>Tax</h1> 
            <h1>${Math.round(taxPrice)}</h1>
          </div> 

          <div className="flex justify-between"> 
            <h1>Shipping</h1> 
            <h1>${shipping}</h1>
          </div> 



          <strong className="flex justify-between"> 
            <h1>Order Total</h1> 
            <h1>${Math.round(orderTotal)}</h1>
          </strong>  

          <button className="bg-[green] text-white rounded-md hover:bg-black mt-2 p-1"
          onClick={PlaceorderHandler} 
          >
          {loading ? 'Loading...': 'Place Order'}
          </button>
          
         </div>  

         </div>

    </div> 


    
)
}

export default PlaceOrder