 import { useState } from "react"
 
 function AccountPage() {
    const [isEditing, setIsEditing] = useState(false);
    if(isEditing === false){
        return(
            <div className="account-card-container">
                <div className="account-card">
                    <div className="account-username-conatiner">

                    </div>
                    <div className="account-email-conatiner">

                    </div>
                </div>
            </div>
        )
    }
    
}