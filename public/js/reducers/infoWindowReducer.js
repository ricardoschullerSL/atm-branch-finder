export default function(state= {
    atm: {
        location: {
            city:"",
            street:"",
            postcode:"",
            latitude:"",
            longitude:""
        }
    },
    infoItems: [{id:"Info1", type:"Something", value:"Test1"}]
}, action) {
    switch(action.type) {
        case "SET_DEFAULT_LOCATION_INFO": {
            return {
                ...state,
                atm: {...state.atm, location: action.payload}
            }
        }
        case "SET_INFO_ITEMS" : {
            return {
                ...state,
                infoItems: action.payload
            }
        }
    }
    return state;
}