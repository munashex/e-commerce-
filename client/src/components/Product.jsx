import { Link } from "react-router-dom"
import Rating from "./Rating" 
import axios from 'axios' 
import { Store } from "../store" 
import { useContext } from "react"

const Product = ({product}) => { 

    

    const {state: {cart: {cartItems}}, dispatch} = useContext(Store)  

    const addToCartHandler = async (product) => { 
        const existItem =  cartItems.find((x) => x._id === product._id)  
        const quantity = existItem ? existItem?.quantity + 1 : 1 
        const {data} =  await axios.get(`http://localhost:3000/api/products/${product._id}`)  
        if(data.countInStock < quantity) {
           window.alert('Sorry. Product is out of stock') 
           return
        } 
        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}})
       }

      

    return (
        <div  className="border border-slate-300">
        <Link to={`/product/${product.slug}`}>
       <img src={product.image} alt={product.name}/> 
      </Link>
  
      <div className="p-3"> 
      <Link to={`/product/${product.slug}`}>
      <p className="underline font-semibold decoration-[green] text-[green]">{product.name}</p>  
      </Link> 
      <Rating rating={product.rating} numReviews={product.numReviews}/>
       <p>$ <strong>{product.price}</strong></p> 
      {product.countInStock === 0 ? (
        <button disabled className="bg-[red] p-1 text-white">Out of stock</button>
      ): (
        <button   
        onClick={() => addToCartHandler(product)}
        className="bg-[green] text-white mt-2  hover:bg-[black] hover:text-white p-1">Add to cart</button>
      )}
      </div> 
  
      </div>
    )
}

export default Product