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
    DELETE_SONG_RESET,
    UPDATE_SONG_RESET,
    CLEAR_ERRORS
} from "../constants/songContants.js";

//get all songs
export const allSongsReducer = (state = { songs: [] }, action) => {
    switch (action.type) {
        case ALL_SONGS_REQUEST:
            return {
                loading: true,
            };
        case ALL_SONGS_SUCCESS:
            return {
                loading: false,
                songs: action.payload
            };

        case ALL_SONGS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

//get 1 song
export const detailsSongReducer = (state = { song: {} }, action) => {
    switch (action.type) {
        case DETAILS_SONG_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DETAILS_SONG_SUCCESS:
            return {
                loading: false,
                song: action.payload
            };
        case DETAILS_SONG_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

//add new song
export const newSongReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_SONG_REQUEST:
            return {
                ...state,
                loading: true
            };

        case NEW_SONG_SUCCESS:
            return {
                loading: false,
                success: true,
                song: action.payload
            };

        case NEW_SONG_FAIL:
            return {
                ...state,
                success: false,
                error: action.payload
            };

        // case NEW_SONG_RESET:
        //     return {
        //         ...state,
        //         success: false
        //     }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};

//update-delete song
export const songReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case DELETE_SONG_REQUEST:
        case EDIT_SONG_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_SONG_SUCCESS:
        case EDIT_SONG_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            };

        case DELETE_SONG_FAIL:
        case EDIT_SONG_FAIL:
            return {
                ...state,
                success: false,
                error: action.payload
            };

        case DELETE_SONG_RESET:
            return {
                ...state,
                success: false
            }

        case UPDATE_SONG_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};
