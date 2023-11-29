import { useState,useContext, useEffect } from "react";
import GenericButton from "../components/GenericButton";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Checkbox from "../components/Checkbox";
import { LoginContext } from "./Root";

const apiUrlStart = "https://jaspers-earrings-api.fly.dev"


function LoginPage(){
    const {loginKey, setLoginKey} = useContext(LoginContext);
    const {isRememberMeCheck} = useContext(LoginContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [incorrectAttempt, setIncorrectAttempt] = useState(false);

    

    
    
    const apiUrl = `${apiUrlStart}/api/login`;
    let navigate = useNavigate()

    
    const handleUsernameTextChange = (event) => {
        setUsername(event.target.value)
    };
    const keyDownHandle = (event) => {
        if(event.key === "Enter"){
            posthandle();
        }
    }
    const handlePasswordTextChange = (event) => {
        setPassword(event.target.value)
    }

    const posthandle = () => {
        axios({
            method: "POST",
            url: apiUrl,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {
                'username': username,
                'password': password 
            }
        })
        .then((response) => {
            if(isRememberMeCheck === true){
                window.localStorage.setItem("access_token", response.data.token);
                setLoginKey(response.data.token);
                navigate("/")
                setIncorrectAttempt(false);
            }else{
                setLoginKey(response.data.token);
                navigate("/")
                setIncorrectAttempt(false);
            }
            
        })
        .catch((error) => {
            setIncorrectAttempt(true);
        })
    }


    return(
        <div id="login-container" onKeyDown={keyDownHandle} tabIndex="0">
            <div id="login-input-container">
                <p id="login-title" className="noselect"> Log in</p>
                <div id="input-container">
                    <p className="input-text">Username:</p>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameTextChange}
                        className="login-input"
                    />
                    <p className="input-text">Password:</p>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordTextChange}
                        className="login-input"
                    />
                    <div id="login-button">
                        <GenericButton text={"Login"} clickHandle={posthandle}/>
                    </div>
                    
                    
                    
                </div>
                <div id="remember-me-conatiner">
                        <p className="nomargin">Remember me:</p>
                        <Checkbox/>
                </div>
                {incorrectAttempt &&
                        <div id="incorrect-message-container">
                            <p id="incorrect-message">Incorrect username/ password combination</p>
                        </div>
                }
                
                
            </div>
            
            
        </div>
    )
}

export default LoginPage;