import { useState, createContext, useEffect } from 'react'
import { useCycle } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Content from '../components/Content'
import '../style/App.css'
import axios from 'axios';
import Sidebar2 from '../components/ToggleMenu'
import CartIcon from '../components/CartIcon'
import SingleItemDisplay from '../components/SingleItemDisplay'
const apiUrlStart = "https://jaspers-earrings-api.fly.dev"

export const SildeShowContext = createContext();
export const LoginContext = createContext();
export const UserContext = createContext();


function Root() {
  const [imgUrlList, setImgUrlList] = useState([]);
  const [isSlidshowLoading, setIsSlidshowLoading] = useState(true);
  const [randImgNum, setRandomImgNum] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loginKey, setLoginKey] = useState(null);
  const [userCart, setUserCart] = useState([]);
  const [isRememberMeCheck, setIsRememberMeCheck] = useCycle(false, true);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isDetailsDisplayed, toggleDetailsDisplayed] = useCycle(false, true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentCartId, setCurrentCartId] = useState(null);

  useEffect(() => {
    let apiUrl = `${apiUrlStart}/api/images/content`;
    let ignore = false;
    axios.get(apiUrl)
        .then((response) => {
            if(!ignore){
                setImgUrlList(response.data);
            }
        })
        .then(() =>{
            setRandomImgNum(Math.floor(Math.random() * imgUrlList.length));
        })
        .catch((error) => {
            console.log(error);
        });

        return () => {
            setTimeout(() => {
              setIsSlidshowLoading(false);
            },300)
            
            ignore = true;
        }
  },[])

  useEffect(() => {
    let apiUrl = `${apiUrlStart}/api/verify-token`;
    if(window.localStorage.getItem("access_token")){
      axios({
        method: "POST",
        url: apiUrl,
        headers: { 
          'Authorization': `Bearer ${window.localStorage.getItem("access_token")}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((response) => {
          setLoginKey(window.localStorage.getItem("access_token"));
        })
        .catch((error) => {
          window.localStorage.removeItem("access_token");
          console.log(error);
        })
    }
  },[])

  useEffect(() => {
    let apiUrl = `${apiUrlStart}/api/items/cart`;
    if(loginKey){
      axios({
        method: "GET",
        url: apiUrl,
        headers: { 
          'Authorization': `Bearer ${loginKey}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((cartData) => {
          setUserCart(cartData.data[0].cart);
          setCurrentCartId(cartData.data[0]._id)
          return cartData.data[0]._id
        })
        .catch((error) => {
          window.localStorage.removeItem("access_token");
          console.log(error);
        })
    }
  },[loginKey])

  useEffect(() => {
    if(imgUrlList.length > 0){
      setIsSlidshowLoading(false);
    }
  },[imgUrlList])

  useEffect(() => {
    if(currentCartId){
      const cartString = encodeURIComponent(JSON.stringify(userCart));
      let apiUrl = `${apiUrlStart}/api/items/cart/${currentCartId}?userCart=${cartString}`;
      axios({
        method: "POST",
        url: apiUrl,
        headers: { 
          'Authorization': `Bearer ${loginKey}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }
  },[currentCartId, userCart])


  return (
    <UserContext.Provider value={{userCart, setUserCart, isOpen, toggleOpen, isDetailsDisplayed, toggleDetailsDisplayed, setSelectedItem}}>
      <LoginContext.Provider value={{isRememberMeCheck, setIsRememberMeCheck, loginKey, setLoginKey}}>
        <SildeShowContext.Provider value={{imgUrlList, isSlidshowLoading, randImgNum, setRandomImgNum}}>
          <div id='app-container'>
            <SingleItemDisplay itemId={selectedItem}/>
            <Sidebar/>
            <CartIcon cartLength={userCart.length} toggleOpen={toggleOpen}/>
            <Outlet/>
          </div>
        </SildeShowContext.Provider>
      </LoginContext.Provider>
    </UserContext.Provider>
  )
}

export default Root
