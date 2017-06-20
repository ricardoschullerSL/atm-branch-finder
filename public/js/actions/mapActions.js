import store from "../store";

export function setATMLocation() {
    const atm = store.getState().infoWindow.filteredATMS[
        store.getState().infoWindow.activeATMIndex
    ];
    setLocation(atm.GeographicLocation.Latitude, atm.GeographicLocation.Longitude);
}

export function setInfoObjectLocation(infoObject) {
    if (!infoObject) {
        const infoObject = store.getState().infoWindow.filteredInfoObjects[store.getState().infoWindow.infoId];
    }
    if (infoObject.GeographicLocation) {
        return (dispatch) => {dispatch(setMapCoordinates(infoObject.GeographicLocation))}
    } else {
        return {type:"NO_ACTION"};
    }
}

export function setMapCoordinates(geographicLocation) {
    return (dispatch) => {
            dispatch(setLatitude(geographicLocation.Latitude));
            dispatch(setLongitude(geographicLocation.Longitude));
        }
}

export function setLatitude(latitude) {
    return {
        type:"SET_INFO_OBJECT_LATITUDE",
        payload: latitude
    };
}

export function setLongitude(longitude) {
    return {
        type:"SET_INFO_OBJECT_LONGITUDE",
        payload: longitude
    }
}