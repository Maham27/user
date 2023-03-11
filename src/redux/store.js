import { configureStore } from '@reduxjs/toolkit';
import {combineReducers} from "redux";
import {alertslice} from "./alertslice";
import { username } from './username';

const rootReducer=combineReducers({

    alerts:alertslice.reducer,
    user:username.reducer,

});

const store=configureStore({
    reducer:rootReducer,
});
export default store;

