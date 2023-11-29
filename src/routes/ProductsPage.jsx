import ItemDisplay from '../components/ItemDisplay';
import FilterProducts from '../components/FilterProducts';
import { useState,useEffect,useRef } from 'react';
import { motion } from 'framer-motion';

function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("None");
    const headerRef = useRef(null);

    useEffect(() => {
        headerRef.current.scrollIntoView({
            behavior: "smooth"
        });
    },[])

    return(
        <div id='products-page-container'>
            <div id='products-page-header' ref={headerRef}>
                <p className='header-text noselect'>Products</p>
            </div>
            <motion.div id='filter-container' className='noselect'
                initial={{
                    y:-20,
                    opacity:0
                }}
                animate={{
                    y:0,
                    opacity:1
                }}
                transition={{
                    duration:0.1,
                    stiffness:1
                }}
            >
                <div id='filter-box'>
                    <p className='nomargin' id='filter-title'>Filter by category:</p>
                    <FilterProducts selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                </div>
            </motion.div>

            <div className='item-cards-container noselect' id='products-page-container'>
                <ItemDisplay filter={`${selectedCategory}`} filterType={"category"}/>
            </div>
        </div>
        
    )
}

export default ProductsPage