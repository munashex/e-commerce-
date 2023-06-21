import { Helmet } from "react-helmet-async" 
import {useState, useContext} from 'react' 
import { Store } from "../store" 
import {useNavigate} from 'react-router-dom'
import CheckOutSteps from "../components/checkOutSteps"

const ShippingAdress = () => { 

    const navigate = useNavigate()
        
    const {dispatch, state: {cart}} = useContext(Store) 
    const {shippingAddress} = cart 
    



    const [fullName, setFullName] = useState(shippingAddress.fullName || '')
    const [address, setAddress] = useState(shippingAddress.address || ' ') 
    const [city, setCity] = useState(shippingAddress.city || ' ') 
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || ' ') 
    const [country, setCountry] = useState(shippingAddress.country || '')  
   


    const submitHandler = (e) => { 
        e.preventDefault() 
       dispatch({type: "SAVE_SHIPPING_ADDRESS", 
        payload: {
            fullName, 
            address,
            city,
            postalCode, 
            country
        }
       })
       localStorage.setItem('shippingAddress', 
       JSON.stringify({
        fullName, 
        address, 
        city, 
        postalCode, 
        country
       })) 
       navigate('/payment')
    }


    return (
        <div className="mt-4"> 
   <Helmet>
    <title>Shipping Address</title>
   </Helmet> 
   <CheckOutSteps step1 step2 />
   <h1 className="font-semibold text-xl text-center mt-5">Shipping Address</h1>  
   <form className="flex flex-col mx-auto w-[80%] lg:w-[50%]" onSubmit={submitHandler}> 

<label htmlFor="fullname">full name</label> 
<input id="fullname" type="text"   
className="border h-9 border-slate-300 outline-[green]" 
required  
value={fullName}
onChange={(e) => setFullName(e.target.value)}
/>  

<label htmlFor="address" className="mt-5">Address</label> 
<input id="address" type="text" 
 className="border h-9 border-slate-300 outline-[green]"  
 required   
 value={address}
 onChange={(e) => setAddress(e.target.value)}
/>  

<label htmlFor="city" className="mt-5">City</label> 
<input id="city" type="text" 
 className="border h-9 border-slate-300 outline-[green]"  
 required   
 onChange={(e) => setCity(e.target.value)} 
 value={city}
/>  

<label htmlFor="postcode" className="mt-5">Postal code</label> 
<input id="postcode" type="text" 
 className="border h-9 border-slate-300 outline-[green]"  
 required  
 value={postalCode}
 onChange={(e) => setPostalCode(e.target.value)}
/>  

<label htmlFor="country" className="mt-5">Country</label> 
<input id="country" type="text" 
 className="border h-9 border-slate-300 outline-[green]"  
 required  
 value={country}
 onChange={(e) => setCountry(e.target.value)}
/>  

<button  type="submit" className="bg-[green] w-[40%] rounded-md mt-5 h-9 text-white
 hover:bg-black">continue</button>
</form> 
        </div>
    )
}

export default ShippingAdress