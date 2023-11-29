import { motion } from "framer-motion";

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            opacity: { duration: 0.1},
            y:{stiffness: 10, velocity: -100}
        }
    },
    closed: {
        y: 0,
        opacity: 0,
        transition: {
            opacity: { duration: 0.1},
            y: { stiffness: 1000 }
        }
    }
};

function MenuButton ({text, clickHandle}) {

    return(
        <motion.li
            variants={variants}
            whileHover={{scale: 1.02}}
            whileTap={{scale:0.95}}
            onClick={clickHandle}
            className="menu-button-container"
        >
            <div >
                <motion.button className="menu-button noselect">{text}</motion.button>
            </div>
        </motion.li>
    )
}

export default MenuButton;