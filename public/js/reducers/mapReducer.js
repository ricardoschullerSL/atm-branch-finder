export default function(state = {
    latitude:"",
    longitude:"",
    userLatitude: "",
    userLongitude: "",
}, action) {
    switch(action.type) {
    case "SET_INFO_OBJECT_LATITUDE" : {
        return {
            ...state,
            latitude: action.payload
        };
    }
    case "SET_INFO_OBJECT_LONGITUDE" : {
        return {
            ...state,
            longitude: action.payload
        };
    }
    case "SET_USER_LATITUDE" : {
        return {
            ...state,
            userLatitude: action.payload
        };
    }
    case "SET_USER_LONGITUDE" : {
        return {
            ...state,
            userLongitude: action.payload
        };
    }        
    }
    return state;
}