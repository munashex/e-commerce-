import { Helmet } from "react-helmet-async" 
import {useContext} from 'react' 
import { Store } from "../store"  
import { Link, useNavigate } from "react-router-dom" 
import axios from 'axios'

const Cart = () => { 
  

    const navigate = useNavigate()
    const {state: {cart: {cartItems}}, dispatch} = useContext(Store)
    
 


    const updateCartHandler = async (product, quantity) => {
     const {data} =  await axios.get(`http://localhost:3000/api/products/${product._id}`)  
     if(data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock') 
        return
     } 
     dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}})
    }
     
    
   const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
   } 



    return (
        <div className="mt-5"> 

            <Helmet>
            <title>Cart</title>
            </Helmet> 
            <h1 className="text-xl font-semibold mx-3">Shopping Cart</h1>

           <div className="flex flex-col lg:flex-row  gap-5 justify-normal lg:justify-evenly  lg:gap-0">
             
            <div>
            {
                cartItems.length === 0 ? (
                    <div className="flex  gap-2 bg-sky-200 p-4"> 
                    <h1>Cart is empty </h1> 
                     <Link to="/" className="underline decoration-[blue] text-[blue]">Go shopping</Link>
                    </div>
                ) : 
                (
                    cartItems.map((product) => {
                        return (
                        <div key={product._id} className="flex flex-row  items-center gap-x-8 md:gap-x-12 lg:gap-x-16 border border-1 m-3 p-1 lg:px-10">  

                         <img src={product.image}  
                         className="w-24"
                          alt={product.name}/> 
                          <Link to={`/product/${product.slug}`} 
                           className="underline decoration-[blue] text-[blue]">{product?.name}</Link> 

                            <button onClick={() => updateCartHandler(product, product?.quantity + 1)}>
                                <i className="fas fa-plus"></i>
                            </button> 

                            <button  className="bg-[green] px-1 rounded-md text-white">{product.quantity}</button>  

                            <button 
                            disabled={product.quantity === 1}
                            onClick={() => updateCartHandler(product, product?.quantity - 1)}>
                                <i className="fas fa-minus"></i>
                            </button>  

                            <button onClick={() => removeProduct(product)}> 
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                        )
                    })
                )
             }

            </div>

            <div className=" space-y-2 p-1 flex flex-col  px-3 items-center">
                <h1 className="font-semibold text-lg">Subtotal 
                ({cartItems.reduce((a, c) => a + c.quantity, 0)} Items) 
                 {" "} ${cartItems && cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </h1> 
                <button className={"text-white bg-[green] p-1 rounded-md  w-full"} 
                disabled={cartItems.length === 0} 
                onClick={checkoutHandler}
                >Proceed to checkout</button>
            </div>
           </div>

        </div>
    )
} 

export default Cart