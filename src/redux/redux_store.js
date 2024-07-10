import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import profileReducer from "./profile_reducer";
import dialogsReducer from "./dialogs_reducer";
import sidebarReducer from "./sidebar_reducer";
import usersReducer from "./users_reducer";
import authReducer from "./auth_reducer";
import {thunk} from "redux-thunk";
import appReducer from "./app_reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;