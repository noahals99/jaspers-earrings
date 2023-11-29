import { motion } from "framer-motion";

function GenericButton({text, clickHandle}) {
    return(
        <motion.button
            onClick={clickHandle}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="generic-button"
        >{text}</motion.button>
    )
};

export default GenericButton;