import { motion } from "framer-motion";
import { Link } from 'react-router-dom'

const variants = {
    open: {
        y: 0,
        opacity: 1,
        display: "flex",
        transition: {
            opacity: { duration: 0.1},
            y:{stiffness: 10, velocity: -100}
        }
    },
    closed: {
        y: 0,
        opacity: 0,
        display: "none",
        transition: {
            display: {delay: 0.2},
            opacity: { duration: 0.1},
            y: { stiffness: 1000 }
        }
    }
};

function MenuButton ({text, clickHandle}) {

    return(
        <motion.div
            variants={variants}
            onClick={clickHandle}
            className="menu-link-container"
        >
            <Link to="/login" className="menu-link">{text}</Link>
        </motion.div>
    )
}

export default MenuButton;