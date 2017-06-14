import store from "../store";

export function setAtmIdCounter(newId) {
    store.dispatch({type:"SET_ACTIVE_ATM_INDEX", payload: newId});
}
