import { configurestore } from "redux";
import rootreducers from "./reducer";
import { loadState } from "./LocalStorage";
import { saveState } from "./LocalStorage";
const statetoload = loadState();
const store = createStore(rootreducers, statetoload);


export default store;
