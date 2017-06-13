import store from "../store";

export function setATMLocation(activeBank, atmId) {
    store.dispatch({
        type:"SET_LATITUDE",
        payload: activeBank.data[atmId].GeographicLocation.Latitude
    });
    store.dispatch({
        type:"SET_LONGITUDE",
        payload: activeBank.data[atmId].GeographicLocation.Longitude
    });
}