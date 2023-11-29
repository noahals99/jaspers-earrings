import { useState,useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
const apiUrlStart = "https://jaspers-earrings-api.fly.dev"
const apiUrl = `${apiUrlStart}/api/items/display`;

function ItemDisplay({filter,filterType}) {
    const [isLoading, setIsLoading] = useState(true);
    const [itemdata, setItemData] = useState(null);

    useEffect(() => {
        let ignore = false;
        if(filter !== "None"){
            axios.get(`${apiUrl}?filterType=${filterType}&filter=${filter}`)
            .then((response) => {
                if(!ignore){
                    setItemData(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
            axios.get(`${apiUrl}`)
            .then((response) => {
                if(!ignore){
                    setItemData(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        

        return () => {
            setIsLoading(false);
            ignore = true;
        }
    },[filter])


    
    if(itemdata){
        return(
            Object.keys(itemdata).map((key) => {
                return(<ItemCard 
                        imgUrl={itemdata[key].imageUrl}
                        title={itemdata[key].title}
                        price={itemdata[key].price}
                        itemId={itemdata[key]._id}
                        key={itemdata[key]._id}
                    />)
            })
        )
    }
    
}

export default ItemDisplay;
