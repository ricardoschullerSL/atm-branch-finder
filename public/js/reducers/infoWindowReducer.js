export default function(state= {
    atm: {
        location: {
            city:"",
            street:"",
            postcode:"",
            latitude:"",
            longitude:""
            
        }
    }
}, action) {
    switch(action.type) {
        case "SET_DEFAULT_LOCATION_INFO": {
            return {
                ...state,
                atm: {...state.atm, location: action.payload}
            }
        }
    }
    return state;
}