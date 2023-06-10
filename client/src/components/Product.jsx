import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({product}) => {

    return (
        <div  className="border border-slate-300">
        <Link to={`/product/${product.slug}`}>
       <img src={product.image} alt={product.name}/> 
      </Link>
  
      <div className="p-3"> 
      <Link to={`/product/${product.slug}`}>
      <p className="underline font-semibold decoration-[blue] text-[blue]">{product.name}</p>  
      </Link> 
      <Rating rating={product.rating} numReviews={product.numReviews}/>
       <p>$ <strong>{product.price}</strong></p> 
       <button className="bg-[blue] text-white mt-2  hover:bg-sky-300 hover:text-black p-1">Add to cart</button>
      </div> 
  
      </div>
    )
}

export default Product