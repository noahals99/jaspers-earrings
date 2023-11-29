import { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import axios from "axios";
const apiUrlStart = "https://jaspers-earrings-api.fly.dev"



function CartDisplay({userCart}) {
    const [cartQuantities, setCartQuantities] = useState({});
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        let testObject = {};
        async function setQuantities() {
            const promises = userCart.map((id) => {
                if(id.id in testObject){
                    let newObject = {
                        quantity: testObject[id.id].quantity+1,
                        cartIds: [
                            ...testObject[id.id].cartIds,
                            id.cartId
                        ]
                    }
                    testObject[id.id] = newObject
                }else{
                    let newObject = {
                        quantity: 1,
                        cartIds:[id.cartId]
                    }
                    testObject[id.id] = newObject
                }
                
                return id.id
            });


            return Promise.all(promises);
        }
        if(userCart.length === 0){
            setSubtotal(0);
        };
        
        setQuantities()
        .then((val) => {
            setCartQuantities(testObject);
        })
    },[userCart])

    useEffect(() => {
        if(Object.keys(cartQuantities).length !== 0){
            let tempPriceObject = {};
            async function settingPrices() {
                const promises = Object.keys(cartQuantities).map(async (id) => {
                    let apiUrl = `${apiUrlStart}/api/items/cart/${id}`;

                    function setPrices(){
                        return new Promise((resolve) => {
                            axios({
                                url: apiUrl
                            })
                                .then((itemData) => {
                                    let newObject = {
                                        price: itemData.data.price * cartQuantities[id].quantity
                                    }

                                    tempPriceObject[id] = newObject;
                                    resolve(itemData.data.price * cartQuantities[id].quantity)
                                })
                        })
                    }

                    const itemPrice = await setPrices()
                    

                    
                    return itemPrice
                });
    
    
                return Promise.all(promises);
            }

            settingPrices()
                .then((val) => {
                    const summedPrice = val.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        0,
                      );
                    setSubtotal(summedPrice);
                    
                })
        }
    },[cartQuantities])

    
    

    if(userCart.length === 0){
        return(
            <div className="cart-section">
                <div className="cart-container">
                    <div className="item-card cart-card no-items">
                        <p className="no-items-title"> There are currently no items in your cart...</p>                        
                    </div>
    
                    <div className="total-price">
                        <p className="nomargin price-title">Subtotal: </p>
                        <p className="nomargin price-num">{`$${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2,})}`}</p>
                    </div>
                </div>
            </div>
        )
    } else{
        return(
            <div className="cart-section">
                <div className="cart-container">
                    <ul className="cart-display">
                    {Object.keys(cartQuantities).map((itemId) => {
                        return(
                            <CartItemCard itemId={itemId} key={itemId} quantity={cartQuantities[itemId].quantity} itemIds={cartQuantities[itemId].cartIds} />
                        )       
                    })
                    }
                    
                    </ul>
    
                    <div className="total-price">
                        <p className="nomargin price-title">Subtotal: </p>
                        <p className="nomargin price-num">{`$${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2,})}`}</p>
                    </div>
                </div>
            </div>
        )
    }

    
}

export default CartDisplay
