import store from "../store";

export function setATMLocation(latitude, longitude) {
    store.dispatch({
        type:"SET_LATITUDE",
        payload: latitude
    });
    store.dispatch({
        type:"SET_LONGITUDE",
        payload: longitude
    });
}