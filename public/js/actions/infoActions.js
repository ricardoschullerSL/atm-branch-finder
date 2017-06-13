import store from "../store";

export function setAtmIdCounter(newId) {
    store.dispatch({type:"SET_ATM_ID_COUNTER", payload: newId});
}
