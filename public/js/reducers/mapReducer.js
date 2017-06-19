export default function(state = {
    latitude:"",
    longitude:""
}, action) {
    switch(action.type) {
        case "SET_INFO_OBJECT_LATITUDE" : {
            return {
                ...state,
                latitude: action.payload
            }
        }
        case "SET_INFO_OBJECT_LONGITUDE" : {
            return {
                ...state,
                longitude: action.payload
            }
        }
    }
    return state;
}