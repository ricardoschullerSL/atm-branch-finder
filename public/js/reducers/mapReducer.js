export default function(state = {
    latitude:"",
    longitude:""
}, action) {
    switch(action.type) {
        case "SET_LATITUDE" : {
            return {
                ...state,
                latitude: action.payload
            }
        }
        case "SET_LONGITUDE" : {
            return {
                ...state,
                longitude: action.payload
            }
        }
    }
    return state;
}