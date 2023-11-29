import { motion } from "framer-motion"
import { useContext } from "react";
import { UserContext } from "../routes/Root";
import uuid from 'react-uuid';

function AddToCartButtonLarge({itemId}){
    const {userCart,setUserCart} = useContext(UserContext);

    const addToCartHandle = () => {
        setUserCart([
            ...userCart,
            {id:itemId, cartId:uuid()}
        ])

    }

    return(
        <motion.button
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.95}}
            className="add-to-cart-button-large"
            onClick={addToCartHandle}
        >Add to cart</motion.button>
    )
}

export default AddToCartButtonLarge;