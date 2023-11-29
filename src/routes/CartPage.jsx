import { useRef,useEffect,useContext } from "react";
import { UserContext } from "./Root";
import CartDisplay from "../components/CartDisplay";

function CartPage(){
    const headerRef = useRef(null);
    const { userCart } = useContext(UserContext)

    useEffect(() => {
        headerRef.current.scrollIntoView({
            behavior: "smooth"
        });
    },[])

    return(
        <div id="cart-page-container">
            <div id='products-page-header' ref={headerRef}>
                <p className='header-text noselect'>Cart</p>
            </div>

            <div>
                <CartDisplay userCart={userCart}/>
            </div>
        </div>
    )
}

export default CartPage;