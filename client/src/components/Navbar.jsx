import {useState, useContext} from 'react' 
import { Link } from 'react-router-dom' 
import {FaBars} from 'react-icons/fa' 
import {MdClose} from 'react-icons/md' 
import {Store} from '../store' 
import {BiDownArrow, BiUpArrow} from 'react-icons/bi'



const Navbar = () => { 

    const {dispatch, state} = useContext(Store) 
    const {cart, userInfo} = state  
    
  
    const signOutHandler = () => {
     dispatch({type: 'USER_SIGNOUT'}) 
     localStorage.removeItem('userInfo') 
     localStorage.removeItem('shippingAddress')
     localStorage.removeItem('paymentMethod') 
     localStorage.removeItem('cartItems')
    }

    const [isOpen, setIsOpen] = useState(false)  
    const [openDrop, setOpenDrop] = useState(false)

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const dropDown = () => {
      setOpenDrop(!openDrop)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <div>
        <div className="text-white flex justify-between"> 

            <div className="flex items-center">
             <Link to="/">Munashe store</Link>
            </div>  

            <button className="sm:hidden flex" onClick={toggleOpen}>
             {isOpen ?  
             (<MdClose color="white" size={24}/>) :  
             (<FaBars color="white" size={24}/>)}
            </button> 
           
           <div className="hidden sm:flex sm:items-center gap-1">
            <Link to="/cart">Cart <button className="text-white bg-[green] px-1 rounded-full">{cart.cartItems.length > 0 && cart.cartItems.length}</button></Link>
            {userInfo ? ( 
                            <div> 
                                <button onClick={dropDown} className="inline-flex items-center">
                                     {userInfo.name}{openDrop ? <BiUpArrow size={12} className="mt-1 mx-1"/> :  <BiDownArrow size={12} className="mt-1 mx-1"/>}
                                     </button> 
                                 {
                                openDrop && (
                                    <div className="absolute bg-[whitesmoke] top-11 right-3 divide-y divide-[green] space-y-1 rounded-md shadow-md flex flex-col 
                                      text-black p-2"> 
                                        <Link className="">User Profile</Link> 
                                        <Link>Order History</Link> 
                                        <button onClick={signOutHandler} className='bg-[green] text-white rounded-md p-0.5'>sign out</button>
                                    </div>
                                )
                                 }
                               </div>
                          ) : (
                            <Link to="/signin">Sign in</Link>
                          )}
           </div> 

          

        </div> 
        {
            isOpen && (
                <div className="sm:hidden text-white mt-2" > 
              <Link to="/cart" onClick={closeMenu} >Cart <button className="text-white  bg-[green] px-1 rounded-full">{cart.cartItems.length > 0 && cart.cartItems.length}</button></Link>
             {userInfo ? ( 
            <div> 
             <Link onClick={dropDown} className="inline-flex items-center">
             {userInfo.name}{openDrop ? <BiUpArrow size={12} className="mt-1 mx-1"/> :  <BiDownArrow size={12} className="mt-1 mx-1"/>}
             </Link> 
              {
             openDrop && (
             <div className="absolute bg-[whitesmoke] top-11 right-3 divide-y divide-[green] space-y-1 rounded-md shadow-md flex flex-col 
              text-black p-2"> 
             <Link className="">User prolife</Link> 
            <Link>Order History</Link> 
            <button onClick={signOutHandler} className='bg-[green] text-white rounded-md p-0.5'>sign out</button>
             </div>
                 )
                 }
                          </div>
                          ) : (
                            <Link to="/signin" className='mx-1'>Sign in</Link>
                          )}
                </div>
            )
           }
        </div>
    )
} 

export default Navbar 