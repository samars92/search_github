import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const appreducer =(state:any = {}, action: any) => {
    return state;
}

const reducer = combineReducers({
    appreducer,
})

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);