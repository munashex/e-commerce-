import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homescreen from "./screens/Homescreen" 
import Productscreen from "./screens/Productscreen"
import { Store } from './store'
import { useContext } from 'react' 
import Cart from './screens/Cart' 
import Signin from './screens/Signin'
import Navbar from './components/Navbar' 
import Signup from './screens/signup'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAdress from './screens/ShippingAddress'  
import Payment from './screens/Payment' 
import PlaceOrder from './screens/Placeorder' 
import Order from './screens/Order'


const App = () => { 
  const {state} = useContext(Store) 

 

 
  return (
    <BrowserRouter>
    <div>
      <ToastContainer limit={1}/>
<header className="bg-[black] p-3">
  <Navbar/>
</header>  

<main> 
  <Routes>
    <Route path="/" element={<Homescreen/>}/> 
    <Route path="/product/:slug" element={<Productscreen/>}/> 
    <Route path="/cart" element={<Cart/>}/> 
    <Route path="/signin" element={<Signin/>}/> 
    <Route path="shipping" element={<ShippingAdress/>}/> 
    <Route path="/signup" element={<Signup/>}/> 
    <Route path="/payment" element={<Payment/>}/> 
    <Route path="/placeorder" element={<PlaceOrder/>}/> 
    <Route path="/order/:id" element={<Order/>}/>
  </Routes>
 
</main>
    </div> 
    </BrowserRouter>
  )
}
 

export default App