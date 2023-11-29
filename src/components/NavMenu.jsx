import { motion } from "framer-motion";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import MenuItems from "./MenuItems";
import MenuButton from "./MenuButton";
import MenuLink from "./MenuLink"
import { LoginContext } from "../routes/Root";
import { UserContext } from "../routes/Root";



const variants = {
    open: {
        transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};





const NavMenu = ({ toggle,isOpen }) => {
    const {loginKey, setLoginKey} = useContext(LoginContext);
    const {setUserCart} = useContext(UserContext);
    
    let navigate = useNavigate()

    const registerHandle = () => {
        if(isOpen){
            toggle();
            navigate("/register");
        }
        
    }

    const logoutHandle = () => {
        if(isOpen){
            toggle();
            setLoginKey(null);
            window.localStorage.removeItem("access_token");
            setUserCart([]);
            navigate("/")
        }
        
    }

    const homeHandle = () => {
        if(isOpen){
            toggle();
            navigate("/");
        }
        
    }

    const ProductsHandle = () => {
        if(isOpen){
            toggle();
            navigate("/products");
        }
        
    }

   return(

    <motion.ul variants={variants} className="nav-menu">
        {!loginKey &&
                <>
                    <MenuButton text={"Register"} clickHandle={registerHandle}/>
                    <MenuLink text={"Or login"}></MenuLink>
                </>
        }
        {loginKey &&
             <MenuButton text={"Logout"} clickHandle={logoutHandle}/>
        }
        <MenuItems text={"Home"} toggle={homeHandle}/>
        <MenuItems text={"Products"} toggle={ProductsHandle}/>
    </motion.ul>
   )
}

export default NavMenu;