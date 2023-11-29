import { motion } from "framer-motion"

const Path = props => {
    return(
        <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="white"
        strokeLinecap="round"
        {...props}
    />
    );
    
};


function ToggleMenu ({toggle}) {
    return (
        <motion.button
            onClick={toggle}
            className="navbar-button"
            style={{
                borderRadius: "100%",
                backgroundColor: "transparent",
                border: "none",
            }}
        >
            <svg width="40" height="40" viewBox="0 0 20 20">
                <Path
                    variants={{
                        closed: {d: "M 2.5 6 L 16.5 6"},
                        open: {d: "M 4 6 L 15 16"}
                    }}
                />

                <Path
                    d="M 2.5 11 L 16.5 11"

                    variants={{
                        closed: {opacity: 1},
                        open: {opacity: 0}
                    }}

                    transition={{ duration: 0.1 }}
                />

                <Path
                    variants={{
                        closed: {d: "M 2.5 16 L 16.5 16"},
                        open: {d: "M 4 16 L 15 6"}
                    }}
                />
            </svg>
            
        </motion.button>
    )
}

export default ToggleMenu