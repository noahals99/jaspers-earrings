import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const CartIconSvg = (props) => (
    <svg
      xmlSpace="preserve"
      id="Layer_1"
      x={0}
      y={0}
      height="50px"
      width="50px"
      style={{
        enableBackground: "new 0 0 50 50",
      }}
      viewBox="-5 -5 60 60"
      {...props}
    >
      <style>
        {".st0{fill:none;stroke:white;stroke-width:2.4;stroke-miterlimit:10}"}
      </style>
      <path
        d="M35.5 43H13.8c-1.8 0-3.3-1.5-3.3-3.3V21.1c0-1.8 1.5-3.3 3.3-3.3h21.7c1.8 0 3.3 1.5 3.3 3.3v18.6c0 1.8-1.5 3.3-3.3 3.3z"
        className="st0"
      />
      <path
        d="M15.6 20.9c0-7.8 4.2-14.2 9.4-14.2s9.4 6.3 9.4 14.2"
        className="st0"
      />
    </svg>
)


function CartIcon({cartLength, toggleOpen}) {
  let navigate = useNavigate()
  const cartClickHandle = () => {
    navigate("/Cart");
  }

  return(
      <>
          <motion.div 
          className="cart-icon-container"
          whileHover={{scale:1.03}}
          whileTap={{scale:0.9}}
          onClick={cartClickHandle}
          >
              <CartIconSvg/>
          </motion.div>
          {cartLength > 0 && cartLength < 100 &&
              <div className="cart-number">
                  <p className="cart-length-number noselect">{cartLength}</p>
              </div>
          }
          {cartLength >= 100 &&
              <div className="cart-number">
                  <p className="cart-length-number noselect small-numbers">{cartLength}</p>
              </div>
          }
          
      </>
  )
}

export default CartIcon;