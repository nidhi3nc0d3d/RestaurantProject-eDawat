import React, { useState} from "react";


function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    function onNameChangeHandeler(event) {
        setUserName(event.target.value);
    }
    function onPasswordChangeHandeler(event) {
        setPassword(event.target.value);
    }
    return <div className = "login-container" style={{border: "3px solid red"}}>
        <h2 className = "login-heading" style={{color: "black"}}>Login</h2>
        <form>
        <input className = "userId " style={{borderRadius : "0.575rem", border : "3px solid black"}}
            placeholder="Enter user name"
            value={props.userName}
            type="text" 
            onChange={(event) => onNameChangeHandeler(event)}
        />
        <br/>
        
        <input className = "password" style={{borderRadius : "0.575rem", border : "3px solid black"}}
            placeholder="Enter password"
            value = {props.password}
            type="password" 
            onChange={(event) => onPasswordChangeHandeler(event)}
        />
        <br/>
        <button style={{ 
            backgroundColor: "#A0D8B3",
            borderRadius : "0.575rem",
            border : "3px solid black"
        }}
        onClick = {() => props.onClickHandeler(userName, password)} className = "login-btn" type = "button">Submit</button>
        </form>
    </div>
}

export default Login;
