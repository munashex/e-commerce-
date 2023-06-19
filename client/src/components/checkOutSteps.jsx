
const CheckOutSteps = ({step1, step2, step3, step4}) => {

    return (
        <div className="grid grid-cols-4 mx-2 md:mx-5 lg:mx-8"> 

        <div step1 className={`${step1 ?
             'border-b-4 border-b-green-500 text-green-600': 
              'border-b-4 border-b-gray-500  text-gray-500'}`}>Sign In</div> 

        <div step2 className={`${step2 ?
             'border-b-4 border-b-green-500 text-green-600': 
              'border-b-4 border-b-gray-500  text-gray-500'}`}>Shipping</div>  

        <div step3 className={`${step3 ?
             'border-b-4 border-b-green-500 text-green-600': 
              'border-b-4 border-b-gray-500  text-gray-500'}`}>Payment</div> 

        <div step4 className={`${step4 ?
             'border-b-4 border-b-green-500 text-green-600': 
              'border-b-4 border-b-gray-500  text-gray-500'}`}>Place Order</div>
        </div>
    )
}

export default CheckOutSteps