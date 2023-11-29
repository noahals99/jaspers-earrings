import { motion } from "framer-motion";
import { useContext,useEffect } from "react";
import { LoginContext } from "../routes/Root";

const checkboxVarients = {
    checked: {
        scale: 1
    },
    unchecked: {
        scale: 0
    }
}





function Checkbox({}){
    const {isRememberMeCheck, setIsRememberMeCheck} = useContext(LoginContext);

    

    return(
        <div className="checkbox-outer" onClick={setIsRememberMeCheck}>
            <motion.div 
                className="checkbox-inner"
                initial={false}
                animate={isRememberMeCheck ? "checked" : "unchecked"}
                variants={checkboxVarients}
                transition={{
                    type: "tween",
                    stiffness: 1000,
                    duration: 0.05,
                }}
            >

            </motion.div>
        </div>
        
    )
}

export default Checkbox