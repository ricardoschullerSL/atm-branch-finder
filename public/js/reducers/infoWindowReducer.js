export default function(state= {
    activeATM: {
        location: {
            city:"",
            street:"",
            postcode:"",
            latitude:"",
            longitude:""
        }
    },
    allATMS: [],
    filteredATMS: [],
    activeATMIndex: 0,
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
        case "SET_ALL_ATMS": {
            return {
                ...state,
                allATMS: action.payload
            }
        }
        case "SET_FILTERED_ATMS": {
            return {
                ...state,
                filteredATMS: action.payload
            }
        }
        case "SET_ACTIVE_ATM_INDEX" : {
            return {
                ...state,
                activeATMIndex: action.payload
            }
        }
    }
    return state;
}