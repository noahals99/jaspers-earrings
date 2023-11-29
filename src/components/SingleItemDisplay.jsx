import { useEffect,useState,useContext } from "react";
import axios from "axios";
import AddToCartButtonLarge from "./AddToCartButtonLarge";
import { UserContext } from "../routes/root";
import { motion } from "framer-motion";
const apiUrlStart = "https://jaspers-earrings-api.fly.dev";

const exitVariants = {
    open: {
        opacity: 1,
        display: "flex",
    },
    closed: {
        opacity: 0,
        display: "none",
        transition: {
            display: {
                delay: 0.3
            }
        }
    }
}

const cardVariants = {
    open: {
        opacity: 1,
        display: "flex",
        transition: {
            opacity: {
                type: "linear"
            }
        }
    },
    closed: {
        opacity: 0,
        display: "none",
        transition: {
            display: {
                delay: 0.3
            },
            opacity: {
                type: "linear"
            }
        }
    }
}

const backgroundVariants = {
    open: {
        opacity: 1,
        display: "flex",
    },
    closed: {
        opacity: 0,
        display: "none",
        transition: {
            display: {
                delay: 0.1
            }
        }
    }
}

const ExitButton = ({cardClickHandle, isDetailsDisplayed}) => {
    return(
        <motion.div 
        className="exit-button-container"
        onClick={cardClickHandle}
        initial={false}
        animate={isDetailsDisplayed ? "open" : "closed"} 
        variants={exitVariants}
        >
            <svg width="25" height="25" viewBox="-10 -10 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 208L208 8M8.70711 8L208.707 208" stroke="white" strokeWidth="35" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </motion.div>
    )
}


const SingleItemDisplay = ({itemId}) => {
    const {isDetailsDisplayed, toggleDetailsDisplayed} = useContext(UserContext)
    const [itemData, setItemData] = useState(null);

    const cardClickHandle = () => {
        toggleDetailsDisplayed();
    }

    useEffect(() => {
        if(itemId){
            let apiUrl = `${apiUrlStart}/api/items/cart/${itemId}`;
            axios({
                url: apiUrl
            })
            .then((response) => {
                setItemData(response.data);
                return response
            })
        }
        
    },[itemId])

    if(itemData){
        return(
            
            <motion.div className="single-item-display-outer-conatiner"
                initial={false}
                animate={isDetailsDisplayed ? "open" : "closed"}
                variants={backgroundVariants}
            >
                <div className="background-click" onClick={cardClickHandle}></div>
                <motion.div 
                className="single-item-display-conatiner" 
                initial={false}
                animate={isDetailsDisplayed ? "open" : "closed"} 
                variants={cardVariants}
                >
                    <div className="single-item-img-conatiner">
                        <ExitButton cardClickHandle={cardClickHandle} isDetailsDisplayed={isDetailsDisplayed}/>
                        <img className="single-item-img" src={itemData.imageUrl}/>
                    </div>

                    <div className="info-border">
                        <div className="single-item-title-conatiner">
                            <p className="nomargin" id="single-item-title">{itemData.title}</p>
                        </div>
                        <div className="single-item-description-conatiner">
                            <p className="nomargin" id="single-item-description">{itemData.description}</p>
                        </div>
                        <div className="single-item-price-conatiner">
                            <p className="nomargin" id="single-item-price">${itemData.price}</p>
                        </div>
                        <AddToCartButtonLarge itemId={itemId}/>
                    </div>
                </motion.div>
            </motion.div>
        )
    }
    
}

export default SingleItemDisplay;