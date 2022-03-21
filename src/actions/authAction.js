import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from "../constants/authConstants";

import axios from "axios";

const url = "http://localhost:8080/";

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:8080",
                "Access-Control-Allow-Credentials": true,
            },
        };

        const data = await axios.post(url, { username, password }, config);
        console.log(data);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: "Loi",
        });
    }
};
