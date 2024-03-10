import React, {useState} from "react";
import Axios from "axios";
import Cookies from "universal-cookie";


function Login({setIsAuth}) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const cookies = new Cookies();


    const login = () => {
        console.log("get log in");
        Axios.post("http://localhost:3001/login", {username, password}).then((res) => {
                const {token, userId, firstName, lastName, username, hashedPassword} = res.data;
                cookies.set("token", token);
                cookies.set("userId", userId);
                cookies.set("firstName", firstName);
                cookies.set("lastName", lastName);
                cookies.set("username", username);
                cookies.set("hashedPassword", hashedPassword);
                setIsAuth(true);
            }
        )
    }


    return <div className="signUp">
        <label>Login</label>
          <input placeholder="Username" onChange={(event) => {
            setUsername(event.target.value);
        }} />

        <input placeholder="Password" onChange={(event) => {
            setPassword(event.target.value);
        }} />
        <button onClick={login}>Login</button>
    </div>
}


export default Login;