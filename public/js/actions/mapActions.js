import store from "../store";

export function setInfoObjectLocation(infoObject) {
    if (infoObject) {
        if (infoObject.GeographicLocation) {
            return (dispatch) => dispatch(setMapCoordinates(infoObject.GeographicLocation))
        } 
    }
    else {
        return {type:"NO_ACTION"};
    }
}

export function setMapCoordinates(geographicLocation) {
    if (geographicLocation) {
        return (dispatch) => {
                dispatch(setLatitude(geographicLocation.Latitude));
                dispatch(setLongitude(geographicLocation.Longitude));
        }
    } else {
        return {type:"ADD_ERROR_TO_LOG", payload:"No geographicLocation object given when setting map coordinates."}
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