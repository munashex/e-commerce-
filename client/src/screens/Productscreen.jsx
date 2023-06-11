import {useParams} from 'react-router-dom'   
import {useReducer, useEffect, useContext} from 'react'  
import axios from 'axios'
import Rating from '../components/Rating' 
import { Helmet } from 'react-helmet-async'
import { getError } from '../utils/Error'
import { Store } from '../store'

const reducer = (state, action) => {
    switch(action.type) {
      case "FETCH_REQUEST": 
      return {...state, loading: true}
      case "FETCH_SUCCESS": 
      return {...state,  product: action.payload, loading: false} 
      case "FETCH_FAIL": 
      return {...state, loading: false, error: action.payload} 
      default: 
      return state
    }
  }

const Productscreen = ({rating, numReviews}) => { 
    const params = useParams() 
    const {slug} = params 

    const [{loading, error, product}, dispatch] = useReducer(reducer, {loading: true, error: '', product: []})
  
  useEffect(() => {
   const fetchData = async() => {
    dispatch({type: "FETCH_REQUEST"}) 
    try {
      const results = await axios.get('http://localhost:3000/api/products/slug/' + slug)  
      dispatch({type: 'FETCH_SUCCESS', payload: results.data})
    }catch(err) {
    dispatch({type: 'FETCH_FAIL', payload: getError(err)})
    }
   } 
fetchData()
  }, [slug])

  const {dispatch: cxtDispatch } = useContext(Store)   
  
  
  
const addToCartHandler = () => {
cxtDispatch({type: "CART_ADD_ITEM", payload: {...product, quantity: 1}})
}


    return (
loading ? <h1>Loading...</h1> : error ?  
(
   <div className="bg-red-500 text-center rounded-full text-white w-[80%] md:w-[60%] lg:w-[40%] mx-auto mt-20">{error}</div>
) : 
 (
<div className="flex flex-col lg:flex-row mt-8">  
<img src={product.image} alt={product.name} className="w-[80%] md:w-[60%] lg:w-[40%]"/>


{/* details */} 
<div className="divide-y space-y-2 mx-1 lg:mx-0">
    <Helmet>
        <title>{product.name}</title>
    </Helmet>
 <h1 className="text-2xl font-semibold">{product.name}</h1>  
 <Rating rating={product.rating} numReviews={product.numReviews}/> 
 <h1>price <strong>${product.price}</strong></h1> 
 <h1>Description: {product.description}</h1>
</div>


<div className="mx-1 lg:mx-7 space-y-3 divide-y my-8 lg:my-0">
<div className="space-x-12"> 
    <span>Price:</span> 
    <span>${product.price}</span>
</div>
<div className="space-x-12"> 
    <span>Status:</span> 
    {product.countInStock > 0 ? 
     <button className="bg-green-600 p-1 rounded-md mt-2 text-white">In Stock</button> : 
      <button className="bg-red-600 p-1 rounded-md mt-2 text-white">Unavailable</button> }
</div> 
<button onClick={addToCartHandler}  className="w-full bg-[green] hover:bg-[black] text-white h-8 mt-3 rounded-md">Add to Cart</button>
</div> 
</div>
)
)}






export default Productscreen  



