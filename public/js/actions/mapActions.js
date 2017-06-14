import store from "../store";

export function setATMLocation() {
    const atm = store.getState().infoWindow.filteredATMS[
        store.getState().infoWindow.activeATMIndex
    ];
    setLocation(atm.GeographicLocation.Latitude, atm.GeographicLocation.Longitude);
}

export function setLocation(latitude, longitude) {
    store.dispatch({
        type:"SET_LATITUDE",
        payload: latitude
    });
    store.dispatch({
        type:"SET_LONGITUDE",
        payload: longitude
    });
}