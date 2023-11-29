import { useContext } from "react"
import AddToCartButton from "./AddToCartButton"
import { UserContext } from "../routes/root"

function ItemCard({imgUrl, title, description, price, itemId}) {
    const {setSelectedItem, toggleDetailsDisplayed} = useContext(UserContext)

    const cardClickHandle = () => {
        setSelectedItem(itemId);
        toggleDetailsDisplayed(true);
        
    }

    return(
        <div className="item-card">
            <div className="card-img-container" onClick={cardClickHandle}>
                <img className="item-image" src={imgUrl} alt={title}/>
            </div>
            <div className="card-text-conatiner">
                <p className="item-title">{title}</p>
            </div>
            <div className="card-text-conatiner">
                <p className="item-price">${price}</p>
            </div>
            <div className="card-text-conatiner">
                <AddToCartButton itemId={itemId}/>
            </div>
            
        </div>
    )
}

export default ItemCard