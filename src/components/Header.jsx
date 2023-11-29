import { useState } from "react";
import { motion } from "framer-motion"

const Path = props => {
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
};



function HamburgerMenu() {
    return(
        <svg width="23" height="23" viewBox="0 0 23 23">
            
        </svg>
    )
}

function Header({isSidebarOpen, setIsSidebarOpen}) {
    const clickHandle = () => {
        if(isSidebarOpen === true){
            setIsSidebarOpen(false);
        }else{
            setIsSidebarOpen(true);
        }
    }

    return(
        <div id="header-container">
            <div className="header-side-box" onClick={clickHandle}>
                <HamburgerMenu />
            </div>
            <div className="header-middle-box">
                <h1 id="header-title">Ales' earring shop</h1>
            </div>
            <div className="header-side-box">
                
            </div>


        </div>
    )
}

export default Header