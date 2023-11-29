import { useState, useEffect, useRef, useLayoutEffect,useContext } from "react";
import { motion, sync, useCycle  } from "framer-motion";
import ToggleMenu from "./ToggleMenu";
import NavMenu from "./NavMenu";
import { UserContext } from "../routes/root";

const sidebarVar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 47px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 8
      }
    }),
    closed: {
      clipPath: "circle(25px at 47px 54px)",
      transition: {
        delay: 0.02,
        type: "spring",
        stiffness: 400,
        damping: 35
      }
    }
  };

function Sidebar({content, setIsSidebarOpen}){
    const { isOpen, toggleOpen } = useContext(UserContext)



    return(
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
        >
            <motion.div className="navbar" variants={sidebarVar}/>
            <NavMenu toggle={() => toggleOpen()} isOpen={isOpen}/>
            <ToggleMenu toggle={() => toggleOpen()}/>
        </motion.nav>
    )
    
}

export default Sidebar;