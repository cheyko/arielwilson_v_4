import React, { useState } from "react";
import withContext from "../../withContext";

const Login = props => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = (e) => {
        setError("");
        e.preventDefault();
        if (!email || !password) {
            return setError("Fill all fields!");
        }
        props.context.login(email, password).then((loggedIn) => {
            if (!loggedIn) {
                setError("Invalid Credentails!");
            }
        });
    }

    function handleChange(e){
        if(e.target.name === "email"){
            setEmail(e.target.value);
        }else if(e.target.name === "password"){
            setPassword(e.target.value);
        }
        setError("");
    }

    return(
        <div className="container">
            <form onSubmit={e => login(e)} action="/login" method="POST">
                <div className="rows">
                    <div className="row" style={{margin:"1rem"}}>
                        <div className="field">
                            <label className="label">Email: </label>
                            <input
                            className="input"
                            placeholder="Enter Email"
                            type="email"
                            name="email"
                            onChange={e => handleChange(e)}
                            />
                        </div>
                        
                        <div className="field">
                            <label className="label">Password: </label>
                            <input
                            className="input"
                            placeholder="Enter Password"
                            type="password"
                            name="password"
                            onChange={e => handleChange(e)}
                            />
                        </div>
                        {error && (
                            <div className="has-text-danger">{error}</div>
                        )}
                        
                        <div className="field is-clearfix has-text-centered">
                            <button type="submit" className="button is-large is-success is-fullwidth">
                                Login 
                            </button>
                        </div>
                        <div className="has-text-centered"> <b style={{color:"blue"}}>Forgot Password ?</b></div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default withContext(Login);