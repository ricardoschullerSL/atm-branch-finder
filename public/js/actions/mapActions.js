import store from "../store";

export function setATMLocation() {
    const atm = store.getState().infoWindow.filteredATMS[
        store.getState().infoWindow.activeATMIndex
    ];
    setLocation(atm.GeographicLocation.Latitude, atm.GeographicLocation.Longitude);
}

export function setInfoObjectLocation() {
    const infoObject = store.getState().infoWindow.filteredInfoObjects[store.getState().infoWindow.infoId];
    if (infoObject) {
        store.dispatch({
            type:"SET_INFO_OBJECT_LATITUDE",
            payload: infoObject.GeographicLocation.Latitude
        });
    
        store.dispatch({
            type:"SET_INFO_OBJECT_LONGITUDE",
            payload: infoObject.GeographicLocation.Longitude
        });
    }
}