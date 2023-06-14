import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Homescreen from "./screens/Homescreen" 
import Productscreen from "./screens/Productscreen"
import { Store } from './store'
import { useContext } from 'react' 
import Cart from './screens/Cart' 


const App = () => { 
  const {state} = useContext(Store) 

  const {cart} = state 

 
  return (
    <BrowserRouter>
    <div>
<header className="bg-gray-700 p-3">
  <Link to="/" className="text-white font-bold text-lg md:text-xl">Munashex</Link> 
  <Link to="/cart" className="text-white mx-3">  
  Cart {" "}
    {cart.cartItems.length > 0  &&(
      <button className="bg-[green] px-1 rounded-full">
        { cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
      </button>
    )}
  </Link>
</header>  

<main> 
  <Routes>
    <Route path="/" element={<Homescreen/>}/> 
    <Route path="/product/:slug" element={<Productscreen/>}/> 
    <Route path="/cart" element={<Cart/>}/>
  </Routes>
 
</main>
    </div> 
    </BrowserRouter>
  )
}
 

export default App