export function setInfoObjectLocation(infoObject) {
    if (infoObject) {
        if (infoObject.GeographicLocation) {
            return (dispatch) => dispatch(setMapCoordinates(infoObject.GeographicLocation))
        } 
    }
    return {type:"NO_ACTION"};
}

export function setMapCoordinates(geographicLocation) {
    if (geographicLocation) {
        return (dispatch) => {
                dispatch(setMapLatitude(geographicLocation.Latitude));
                dispatch(setMapLongitude(geographicLocation.Longitude));
        }
    } else {
        return {type:"ADD_ERROR_TO_LOG", payload:"No geographicLocation object given when setting map coordinates."}
    }
}

export function setMapLatitude(latitude) {
    return {
        type:"SET_INFO_OBJECT_LATITUDE",
        payload: latitude
    };
}

export function setMapLongitude(longitude) {
    return {
        type:"SET_INFO_OBJECT_LONGITUDE",
        payload: longitude
    }
}

export function getUserGeoLocation() {
    if ("geolocation" in navigator) {
        return (dispatch) => {
            navigator.geolocation.getCurrentPosition((position) => {
                const geographicLocation = {Latitude: position.coords.latitude, Longitude:position.coords.longitude};
                dispatch(setUserCoordinates(geographicLocation));
            }, (failure) => {
                console.log(failure);
            });
        }
    } else {
        return {type:"ADD_ERROR_TO_LOG", payload:"No browser geographic location available."}
    }
}

export function setUserCoordinates(geographicLocation) {
    return (dispatch) => {
        dispatch(setUserLatitude(geographicLocation.Latitude));
        dispatch(setUserLongitude(geographicLocation.Longitude));
    }
}

export function setUserLatitude(latitude) {
    return {type:"SET_USER_LATITUDE", payload: latitude}
}

export function setUserLongitude(longitude) {
    return {type:"SET_USER_LONGITUDE", payload: longitude}
}