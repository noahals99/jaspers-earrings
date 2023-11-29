import { useState } from "react";
import GenericButton from "../components/GenericButton";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
const apiUrlStart = "https://jaspers-earrings-api.fly.dev"

function RegisterPage() {
    const [regsiterUsername, setRegisterUsername] = useState(null);
    const [regsiterEmail, setRegisterEmail] = useState(null);
    const [regsiterPassword, setRegisterPassword] = useState(null);
    const [regsiterPasswordVerify, setRegisterPasswordVerify] = useState(null);

    let navigate = useNavigate()

    const registerSubmitHandle = () => {
        let apiUrl = `${apiUrlStart}/api/register`;
        axios({
            method: "POST",
            url: apiUrl,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {
                'username': regsiterUsername,
                'password': regsiterPassword,
                'email':  regsiterEmail,
            }
        })
            .then(() => {
                navigate("/login");
            })
    }

    const keyDownHandle = (event) => {
        if(event.key === "Enter"){
            registerSubmitHandle();
        }
    }


    const handleUsernameTextChange = (event) => {
        setRegisterUsername(event.target.value)
    };

    const handleEmailTextChange = (event) => {
        setRegisterEmail(event.target.value)
    };

    const handlePasswordTextChange = (event) => {
        setRegisterPassword(event.target.value)
    };

    const handlePasswordVerifyTextChange = (event) => {
        setRegisterPasswordVerify(event.target.value)
    };

    return(
        <div className="Register-card-container noselect" onKeyDown={keyDownHandle}>
            <div className="register-card">
                <p className="register-title nomargin">Register</p>
                <div className="register-input-conatiner">
                    <div className="username-register-conatiner input-container">
                        <p className="nomargin register-input-title">Username</p>
                        <input
                                type="text"
                                value={regsiterUsername}
                                onChange={handleUsernameTextChange}
                                className="register-input"
                        />
                    </div>
                    <div className="email-register-conatiner input-container">
                        <p className="nomargin register-input-title">Email</p>
                        <input
                                    type="text"
                                    value={regsiterEmail}
                                    onChange={handleEmailTextChange}
                                    className="register-input"
                        />
                    </div>
                    <div className="password-register-conatiner input-container">
                        <div className="password-register-input-conatiner">
                            <p className="nomargin register-input-title">Password</p>
                            <input
                                            type="password"
                                            value={regsiterPassword}
                                            onChange={handlePasswordTextChange}
                                            className="register-input"
                            />
                        </div>
                        <div className="password-register-input-conatiner">
                            <p className="nomargin register-input-title password-verify-input">Verify password</p>
                            <input
                                            type="password"
                                            value={regsiterPasswordVerify}
                                            onChange={handlePasswordVerifyTextChange}
                                            className="register-input"
                            />
                        </div>
                        
                        <div className="input-error-conatiner">
                            {(regsiterPassword && regsiterPasswordVerify) && (regsiterPassword !== regsiterPasswordVerify) ? <p className="password-not-matching-text">Passwords do not match</p> : <></>}
                        </div>
                        
                    </div>

                    <div className="register-button-container">
                        <GenericButton text={"Register"} clickHandle={registerSubmitHandle}/>
                    </div>
                    

                </div>
            </div>
        </div>
    )
}

export default RegisterPage