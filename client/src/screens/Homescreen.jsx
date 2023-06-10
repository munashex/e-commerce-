import { Link } from "react-router-dom" 
import { useEffect, useReducer} from "react"
import axios from 'axios'
import Product from "../components/Product" 
import { Helmet } from "react-helmet-async"


const reducer = (state, action) => {
  switch(action.type) {
    case "FETCH_REQUEST": 
    return {...state, loading: true}
    case "FETCH_SUCCESS": 
    return {...state,  products: action.payload, loading: false} 
    case "FETCH_FAIL": 
    return {...state, loading: false, error: action.payload} 
    default: 
    return state
  }
}

const Homescreen = () => {  

  const [{loading, error, products}, dispatch] = useReducer(reducer, {loading: true, error: '', products: []})
  
  useEffect(() => {
   const fetchData = async() => {
    dispatch({type: "FETCH_REQUEST"}) 
    try {
      const results = await axios.get('http://localhost:3000/api/products')  
      dispatch({type: 'FETCH_SUCCESS', payload: results.data})
    }catch(err) {
    dispatch({type: 'FETCH_FAIL', payload: err.message})
    }
   } 
fetchData()
  }, [])

    return (
        <div>
          <Helmet>
            <title>Munashex</title>
          </Helmet>
 <h1 className="p-5 text-lg md:text-xl font-bold">Featured Products</h1>   

<div className="grid grid-cols-1 md:grid-cols-3 mx-4 lg:grid-cols-4 xl:grid-cols-5  gap-2">  
{loading && <h1 className="text-center">loading...</h1>} 
{error && <h1>{error}</h1>}

{
  products.map((product) => (
    <Product key={product.slug} product={product}/>
  ))
 }
</div>
        </div>
    )
} 

export default Homescreen