import store from "../store";

export function setATMLocation() {
    const atm = store.getState().infoWindow.filteredATMS[
        store.getState().infoWindow.activeATMIndex
    ];
    setLocation(atm.GeographicLocation.Latitude, atm.GeographicLocation.Longitude);
}

export function setLocation(latitude, longitude) {
    const infoObject = store.getState().infoWindow.filteredInfoObjects[store.getState().infoWindow.infoId];
    
    store.dispatch({
        type:"SET_LATITUDE",
        payload: infoObject.GeographicLocation.Latitude
    });
    store.dispatch({
        type:"SET_LONGITUDE",
        payload: infoObject.GeographicLocation.Longitude
    });
}