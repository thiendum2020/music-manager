import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/authAction";

export default function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = (e) => {
        e.preventDefault();
		console.log(username, password);
        dispatch(login(username, password));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="form-login">
                    <h3 className="form-login-title">LOG IN</h3>
                    <form onSubmit={loginHandler}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="btn btn-primary btn-login text-uppercase"
                            type="submit"
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
