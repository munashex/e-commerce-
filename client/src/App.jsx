import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Homescreen from "./screens/Homescreen" 
import Productscreen from "./screens/Productscreen"
import { Store } from './store'
import { useContext } from 'react'

const App = () => { 
  const {state} = useContext(Store) 
  const {cart} = state

  return (
    <BrowserRouter>
    <div>
<header className="bg-gray-700 p-3">
  <Link to="/" className="text-white font-bold text-lg md:text-xl">Munashex</Link> 
  <Link to="/cart" className="text-white mx-3">Cart<button className="bg-[green] mx-1 px-1 rounded-full"> {cart.cartItems.length >= 1 && cart.cartItems.length }</button></Link>
</header>  

<main> 
  <Routes>
    <Route path="" element={<Homescreen/>}/> 
    <Route path="/product/:slug" element={<Productscreen/>}/>
  </Routes>
 
</main>
    </div> 
    </BrowserRouter>
  )
}
 

export default App