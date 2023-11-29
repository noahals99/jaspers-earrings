import { useEffect, useRef, Outlet } from "react";

function Content({isSidebarOpen}){
    const contentRef = useRef(null);
    useEffect(() => {
        contentRef.current.classList.toggle("hidden");
    }, [isSidebarOpen])
    return(
        <div className="content-container" ref={contentRef}>
            <div id="content-skeleton">
            </div>
        </div>
    )
}

export default Content;