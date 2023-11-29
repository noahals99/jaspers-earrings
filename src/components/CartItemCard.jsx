import { useEffect, useState, useContext } from "react";
import AddToCartButton from "./AddToCartButton";
import { motion } from "framer-motion";
import axios from "axios";
import { UserContext } from "../routes/root";
import uuid from 'react-uuid';
const apiUrlStart = "https://jaspers-earrings-api.fly.dev"


const QuantityArrowLeft = ({deleteId, itemIds}) => {
    const {userCart, setUserCart} = useContext(UserContext)

    const clickHandle = () => {
        setUserCart(
            userCart.filter(item => item.cartId !== itemIds[itemIds.length - 1])
        );
    }

    return(
        <motion.svg onClick={clickHandle} className="quantity-arrow" width="10" height="10" viewBox="0 0 65 128" fill="none" xmlns="http://www.w3.org/2000/svg" whileHover={{scale:1.15}} whileTap={{scale:0.9}}>
            <path d="M61 4L4 64L61 124" stroke="black" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
    )
}

const QuantityArrowRight = ({itemId}) => {
    const {userCart, setUserCart} = useContext(UserContext)

    const clickHandle = () => {
        setUserCart([
            ...userCart,
            {id:itemId, cartId:uuid()}
        ]);
    }

    return(
        <motion.svg onClick={clickHandle} className="quantity-arrow" width="10" height="10" viewBox="0 0 65 128" fill="none" xmlns="http://www.w3.org/2000/svg" whileHover={{scale:1.15}} whileTap={{scale:0.9}}>
            <path d="M4 4L61 64L4 124" stroke="black" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>

    )
}

const QuantityDisplay = ({quantity,id, itemIds}) => {
    return(
        <div className="quantity-display-container noselect">
            <p className="quantity-title">Quantity: </p>
            <QuantityArrowLeft deleteId={id} itemIds={itemIds}/>
            <p className="item-quantity nomargin">{quantity}</p>
            <QuantityArrowRight itemId={id}/>
        </div>
    )
}



function CartItemCard({itemId,quantity,itemIds}) {
    const [itemData, setItemData] = useState(null);
    const priceId = uuid()

    
    

    useEffect(() => {
        let apiUrl = `${apiUrlStart}/api/items/cart/${itemId}`;
        axios({
            url: apiUrl
        })
        .then((response) => {
            setItemData(response.data);
            return response
        })
    },[])

    if(itemData){
        return(
            <li className="item-list-item">
                <div className="item-card cart-card">
                    <div className="card-img-container cart-img-container">
                        <img className="item-image border-radius" src={itemData.imageUrl} alt={itemData.title}/>
                    </div>
                    <div className="card-text-conatiner cart-text-container">
                        <p className="item-title cart-card-title">{itemData.title}</p>
                        <p className="item-price cart-card-price">${itemData.price}</p>
                        <QuantityDisplay quantity={quantity} id={itemData._id} itemIds={itemIds}/>
                    </div>
                    
                </div>
            </li>
        )
    }
    
}

export default CartItemCard