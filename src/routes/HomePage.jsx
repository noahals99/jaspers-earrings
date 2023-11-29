import { ParallaxProvider } from 'react-scroll-parallax';
import { useState,useEffect,useRef, useContext } from 'react';
import ImageSildeshow from '../components/ImageSildeshow';
import GenericButton from '../components/GenericButton';
import ItemCard from '../components/ItemCard';
import ItemDisplay from '../components/ItemDisplay';
import LoadingIcon from '../components/LoadingIcon';
import { SildeShowContext } from './root';





const HomePage = () => {
    const itemBoxRef  = useRef(null);
    const homePageHeader = useRef(null);
    const {isSlidshowLoading} = useContext(SildeShowContext);
    

    useEffect(() => {
        homePageHeader.current.scrollIntoView({
            behavior: "smooth"
        });
    },[])

    const clickHandle = () => {
        itemBoxRef.current.scrollIntoView({
            behavior: "smooth"
        });
    };

    

    if(isSlidshowLoading === true){
        return(
            <div id='homepage-container'>
                            
            <div id='image-container'>
                <div className='loading-container' ref={homePageHeader}>
                    <LoadingIcon/>
                </div>
            </div>

            <div id='featured-item-conatiner'>
                <div id='title-container'>
                    <h2 id='featured-item-title'>Featured items</h2>
                    
                </div>
                <div id='shop-now-button'>
                    <GenericButton text={"Shop now"} clickHandle={clickHandle}/> 
                </div>
            </div>

            <div className='item-cards-container' ref={itemBoxRef}>
                <ItemDisplay filter={'/featured'}/>
            </div>

            </div>
        )
    }else{
        return(
            <div id='homepage-container'>
                
                <div id='image-container' ref={homePageHeader}>
                    <ImageSildeshow/>
                </div>

                <div id='featured-item-conatiner'>
                    <div id='title-container'>
                        <h2 id='featured-item-title'>Featured items</h2>
                        
                    </div>
                    <div id='shop-now-button'>
                        <GenericButton text={"Shop now"} clickHandle={clickHandle}/> 
                    </div>
                </div>

                <div className='item-cards-container' ref={itemBoxRef}>
                    <ItemDisplay filter={'true'} filterType={"featured"}/>
                </div>
               
            </div>
        )
    }
    
    
}

export default HomePage