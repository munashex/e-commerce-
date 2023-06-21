import {useState, useEffect, useContext} from 'react' 
import {Store} from '../store'
import CheckOutSteps from '../components/checkOutSteps' 
import { Helmet } from 'react-helmet-async' 
import { useNavigate } from 'react-router-dom'

const Payment = () => { 
    let navigate = useNavigate()

    const {state: {cart}, dispatch} = useContext(Store) 
    const {shippingAddress, paymentMethod} = cart  
    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal')

    useEffect(() =>{
    !shippingAddress.address && navigate('/shipping')
    }, [navigate, shippingAddress])

    const submitHandler = (e) => {
      e.preventDefault() 
      dispatch({type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName}) 
      localStorage.setItem('paymentMethod', paymentMethodName) 
      navigate('/placeorder')
    }



    return (
        <div className="mt-4"> 
            <Helmet>
                <title>payment</title>
            </Helmet> 
        <CheckOutSteps step1 step2 step3/> 
        <h1 className="text-3xl font-semibold text-center mt-4">Payment Method</h1> 

        <form className="flex mt-4 gap-y-3 flex-col  items-center" onSubmit={submitHandler}>

       <div>
       
       <div>
       <input 
        type="radio" 
         id="paypal" 
         value="PayPal" 
         checked={paymentMethodName === 'PayPal'} 
         onChange={(e) => setPaymentMethod(e.target.value)}
         />
        <label htmlFor='paypal' className="text-xl mx-2">PayPal</label>
       </div>

       
       <div>
       <input 
        type="radio" 
         id="stripe" 
         value="Stripe" 
         checked={paymentMethodName === 'Stripe'} 
         onChange={(e) => setPaymentMethod(e.target.value)}
         />
         <label htmlFor='stripe' className="text-xl mx-2">Stripe</label>
       </div>
       </div>

       <button type="submit" className="bg-[green] hover:bg-black w-24 text-white p-2 rounded-md">continue</button> 

        </form>

        </div>
    )
}

export default Payment