import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Homescreen from "./screens/Homescreen" 
import Productscreen from "./screens/Productscreen"


const App = () => {

  return (
    <BrowserRouter>
    <div>
<header className="bg-gray-700 p-3">
  <Link to="/" className="text-white font-bold text-lg md:text-xl">Munashex</Link>
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