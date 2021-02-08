import { createStore, applyMiddleware} from 'redux';
import {
    RECEIVE_SEARCH,
    REQUEST_SEARCH,
    REQUEST_SEARCH_DONE,
    UI_SEARCH_TEXT_CHANG,
    UI_SEARCH_TYPE_CHANG
} from "./actions";
import thunk from "redux-thunk"


const DEFAULT_STATE = {isFetching: false, items: [], searchq: '', searchType: 'user'};
const stateFromLocalStorage = window.localStorage.getItem('state');
const initSate = stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : DEFAULT_STATE;


const appReducer = (state = initSate, action) => {
    const {type, ...actionRestData} = action;
    switch (type) {
        case UI_SEARCH_TEXT_CHANG:
            state = {...state, searchq: actionRestData.searchq};
            break;
        case UI_SEARCH_TYPE_CHANG:
            state = {...state, searchType: actionRestData.searchType};
            break;
        case REQUEST_SEARCH:
            state = {...state, isFetching: true};
            break;
        case REQUEST_SEARCH_DONE:
            state = {...state, isFetching: false};
            break;
        case RECEIVE_SEARCH:
            state = {...state, items: actionRestData.searchResults};
            break;

    }
    window.localStorage.setItem('state', JSON.stringify(state))
    return state;
}


// @ts-ignore
//export const store = createStore(appReducer);
export const store = createStore(appReducer, applyMiddleware(thunk));


//
// const persistConfig = {
//     key: "root",
//     storage
// }

//const persistedReducer = persistReducer(persistConfig, reducer);
//export const store = createStore(persistedReducer);

//export const persistor = persistStore(store);