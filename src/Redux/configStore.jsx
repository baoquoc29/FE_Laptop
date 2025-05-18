import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';
import { UserReducer } from './reducers/UserReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import {LocationReducer} from "./reducers/LocationReducer";

const rootReducer = combineReducers({
    UserReducer,
    LoadingReducer,
    LocationReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
