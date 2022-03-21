import { db } from "../db.js";
import {
    ALL_SONGS_REQUEST,
    ALL_SONGS_SUCCESS,
    ALL_SONGS_FAIL,
    DELETE_SONG_REQUEST,
    DELETE_SONG_SUCCESS,
    DELETE_SONG_FAIL,
    NEW_SONG_REQUEST,
    NEW_SONG_SUCCESS,
    NEW_SONG_FAIL,
    EDIT_SONG_REQUEST,
    EDIT_SONG_SUCCESS,
    EDIT_SONG_FAIL,
    DETAILS_SONG_REQUEST,
    DETAILS_SONG_SUCCESS,
    DETAILS_SONG_FAIL,
    CLEAR_ERRORS,
} from "../constants/songContants.js";
import axios from "axios";

const url = "/api/...";

export const getAllSongs = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_SONGS_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
                //get token on cookies
            },
        };
        // Call API getAllSongs
        // const { data } = await axios.get(url + "my-song", config);

        //Test
        // if (localStorage.getItem("data")) {
        //     data = JSON.parse(localStorage.getItem("data"))
        // }
        // const temp = JSON.parse(localStorage.getItem("data"))
        let data = db

        dispatch({
            type: ALL_SONGS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_SONGS_FAIL,
            payload: "Custom Error",
        });
    }
};

export const getDetailsSong = (id) => async (dispatch) => {
    try {
        dispatch({ type: DETAILS_SONG_REQUEST });

        // Call API det details song
        // const { data } = await axios.get(url + "");

        // Test with local db
        let data = db
        const song = data.find(obj => obj.id == id);

        dispatch({
            type: DETAILS_SONG_SUCCESS,
            payload: song,
        });
    } catch (error) {
        dispatch({
            type: DETAILS_SONG_FAIL,
            ayload: "Custom Error",
        });
    }
};

export const newSong = (name, artist, codeSong) => async (dispatch) => {
    try {
        dispatch({ type: NEW_SONG_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        // Call API create new song
        // const { data } = await axios.post(url + "", { name, artist }, config);

        // Test
        let data = db

        let maxID = 0;
        data.forEach((song) => {
            if (song.id > maxID) {
                maxID = song.id;
            }
        });
        console.log(codeSong);
        const newSong = {
            id: ++maxID,
            name,
            artist,
            codeSong
        };
        console.log(data);
        data.push(newSong);

        localStorage.setItem('data', JSON.stringify(data))

        dispatch({
            type: NEW_SONG_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_SONG_FAIL,
            ayload: "Custom Error",
        });
    }
};

export const editSong = (id, name, artist) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_SONG_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        // const { data } = await axios.put(url + "", { name, artist }, config);
        // Test
        let data = db
        data.map(obj => {
            if (obj.id == id) {
                obj.name = name
                obj.artist = artist
            }
        });
        
        localStorage.setItem('data', JSON.stringify(data))

        dispatch({
            type: EDIT_SONG_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: EDIT_SONG_FAIL,
            payload: "Custom Error",
        });
    }
};

export const deleteSong = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_SONG_REQUEST });

        // call API
        // const { data } = await axios.delete(url + "");

        // Test
        let data = db
        let isItemRemove = getState().allSongsReducer.songs.find(i => i.id === id)
        console.log(isItemRemove);
        localStorage.setItem('data', JSON.stringify(data.filter(i => i !== isItemRemove)))

        dispatch({
            type: DELETE_SONG_SUCCESS,
            payload: true,
        });

    } catch (error) {
        dispatch({
            type: DELETE_SONG_FAIL,
            payload: "Custom Error",
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
