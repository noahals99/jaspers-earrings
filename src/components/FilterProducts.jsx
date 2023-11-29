import { useEffect, useState } from "react";
import { motion, useCycle } from "framer-motion";
import axios from "axios";
import { useLinkClickHandler } from "react-router-dom";
const apiUrlStart = "https://jaspers-earrings-api.fly.dev"

const ListItem = ({text, clickHandle}) => {
    return(
        <li className="category-list-item" onClick={() => clickHandle(text)}>
            <p className="category-list-item-text">{text}</p>
        </li>
    )
}

const variants = {
    open: {
        height: 150,
        opacity: 1,
        display: "flex",
        transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    },
    closed: {
        height: 30,
        opacity: 0,
        display: "none",
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
            display: {
                delay: 0.2
            }
        }
    }
};

let nextId = 0;

function FilterProducts({selectedCategory,setSelectedCategory}) {
    const [categoriesList, setCategoriesList] = useState(null);
    const [filterIsOpen, toggleFilterIsOpen] = useCycle(false, true);

    useEffect(() => {
        let apiUrl = `${apiUrlStart}/api/items/categories/titles`;
        let ignore = false;
        axios({
            method: "GET",
            url: apiUrl,
        })
            .then((list) => {
                setCategoriesList(list.data);
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {        
            ignore = true;
        }
    },[])

    const handleFilterClick = () => {
        toggleFilterIsOpen();
    }

    const handleFilterSelectClick = () => {
        toggleFilterIsOpen();
    }

    const clickHandle = (text) => {
        setSelectedCategory(text);
    }

    return(
        <motion.div className="filter-box-inside">
            <div className="selected-category-conatiner" onClick={handleFilterClick}>
                <p className="nomargin selected-filter-title">{selectedCategory}</p>
            </div>
            <motion.div  initial={true} animate={filterIsOpen ? "open" : "closed"} className="category-dropdown-container"  variants={variants}  onClick={handleFilterSelectClick} >
                <ul className="category-dropdown-list" > 
                    <ListItem text={'None'} key={"None"} clickHandle={clickHandle}/>
                    {categoriesList && categoriesList.map((category) => {
                        return <ListItem text={category} key={category} clickHandle={clickHandle}/>
                    })}
                </ul>
            </motion.div>
            
        </motion.div>
    )
}

export default FilterProducts;