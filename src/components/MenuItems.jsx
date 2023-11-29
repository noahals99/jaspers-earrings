import { motion } from "framer-motion";

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            opacity: { duration: 0.2},
            y:{stiffness: 10, velocity: -900}
        }
    },
    closed: {
        y: 0,
        opacity: 0,
        transition: {
            opacity: { duration: 0.2},
            y: { stiffness: 1000}
        }
    }
};

function MenuItems ({text, toggle}) {

    return(
        <motion.li
            variants={variants}
            whileHover={{scale:1.02}}
            whileTap={{scale:0.95}}
            onClick={toggle}
        >
            <div className="text-placeholder">
                <p className="item-text noselect">{text}</p>
            </div>
        </motion.li>
    )
}

export default MenuItems;