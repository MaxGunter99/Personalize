
import { combineReducers } from "redux";
import timeReducer from "./timeReducer";
import jobReducer from "./jobReducer";

// Combine reducer file to maintain organization
export default combineReducers({

    timeReducer,
    jobReducer

});