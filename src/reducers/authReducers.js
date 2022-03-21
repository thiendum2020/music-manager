import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from "../constants/authConstants";

export const loginReducer = (state = { auth: [] }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthencated: false,
                auth: []
            };
        case LOGIN_SUCCESS:
            return {
                loading: false,
                isAuthencated: true,
                auth: action.payload
            };

        case LOGIN_FAIL:
            return {
                loading: false,
                isAuthencated: false,
                error: action.payload
            };
        default:
            return state;
    }
};