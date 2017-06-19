export default function(state= {
    infoId: 0,
    infoObjects:[],
    filteredInfoObjects:[],
    infoViewItems: [{key:"Key", value:"Value"}]
    
}, action) {
    switch(action.type) {
        case "SET_INFO_VIEW_ITEMS" : {
            return {
                ...state,
                infoItems: action.payload
            }
        }
        case "SET_FILTERED_INFO_OBJECTS": {
            return {
                ...state,
                filteredInfoObjects: action.payload
            }
        }
        case "SET_INFO_OBJECTS" : {
            return {
                ...state,
                infoObjects: action.payload
            }
        }
        case "SET_INFO_ID" : {
            return {
                ...state,
                infoId: action.payload
            }
        }
    }
    return state;
}