import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { allSongsReducer, detailsSongReducer, newSongReducer, songReducer } from "./reducers/songReducers";

const reducer = combineReducers({
    allSongsReducer,
    detailsSongReducer,
    newSongReducer,
    songReducer
});

const initialState = {
    
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
