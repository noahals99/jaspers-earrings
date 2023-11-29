import { useState,useEffect, useContext } from "react";
import { SildeShowContext } from "../routes/Root";


const ImageSildeshow = ({}) => {
    const {imgUrlList} = useContext(SildeShowContext);
    const {randImgNum, setRandomImgNum} = useContext(SildeShowContext);
    


    useEffect(() => {
        const intervalID = setInterval(() =>  {
            setRandomImgNum(Math.floor(Math.random() * imgUrlList.length));
        }, 10000);
    
        return () => clearInterval(intervalID);
    },[imgUrlList])

    

    return(
            <img src={imgUrlList[randImgNum]} alt='Image of earrings' className="slideshow-img noselect"/>
    )
}

export default ImageSildeshow