import { Helmet } from "react-helmet-async" 
import { Link, useNavigate } from "react-router-dom" 
import axios from 'axios' 
import { useState, useContext, useEffect } from "react" 
import { Store } from "../store"
import {toast } from 'react-toastify';


const Signin = () => { 



  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 

  const navigate = useNavigate()
  const {_, dispatch} = useContext(Store)  
  
 

 
  const handleSubmit = async(e) => {
  e.preventDefault() 
  try {
const {data} = await axios.post(`http://localhost:3000/api/users/signin`, {
  email, 
  password
})
dispatch({type: "USER_SIGNIN", payload: data}) 
localStorage.setItem('userInfo', JSON.stringify(data)) 
navigate('/shipping') 
}catch(err) {
 toast.error(err.response.data.message) 
  }
  }

    return (
        <div>
      <Helmet>
        <title>Signin</title>
      </Helmet> 
       <div className="mt-8">
        <h1 className="font-semibold text-xl text-center">Sign In</h1>  
       
        <form className="flex flex-col mx-auto w-[80%] lg:w-[50%]" onSubmit={handleSubmit}> 

        <label htmlFor="email">Email</label> 
        <input id="email" type="text"   
        className="border h-9 border-slate-300 outline-[green]" 
        required 
        onChange={(e) => setEmail(e.target.value)}
        />  

        <label htmlFor="password" className="mt-5">Password</label> 
        <input id="password" type="password" 
         className="border h-9 border-slate-300 outline-[green]"  
         required  
         onChange={(e) => setPassword(e.target.value)}
        />  
        <button  type="submit" className="bg-[green] mt-5 h-9 text-white hover:bg-black">Sign In</button>
        </form>  

        <h1 className="mt-5 text-center font-semibold">New Customer? {""}  
        <Link to="/" className="text-[blue] underline">create your account</Link>
           </h1>

       </div>
   </div>
    )
} 

export default Signin