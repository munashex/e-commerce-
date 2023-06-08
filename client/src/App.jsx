import data from "./data"


const App = () => {

  return (
    <div> 

<header className="bg-gray-700 p-3">
  <a href="/" className="text-white font-bold">munashe store</a>
</header>  

<main> 
  <h1 className="p-3">Featured Products</h1>   

<div className="flex flex-wrap gap-1 justify-center">
{
  data.products.map((product) => (
    <div key={product.slug} class="border border-gray-200">
      <a href={`/product/${product.slug}`}>
     <img src={product.image} alt={product.name} className="w-[100%] max-w-[400px]"/> 
    </a>

    <div class="p-3"> 
    <a href={`/product/${product.slug}`}>
    <p>{product.name}</p>  
    </a>
     <p>$ <strong>{product.price}</strong></p> 
     <button class="bg-black text-white  hover:bg-blue-400 hover:text-black p-1 rounded-md">Add to cart</button>
    </div> 

    </div>
  ))
 }
</div>
</main>
    </div>
  )
}
 

export default App