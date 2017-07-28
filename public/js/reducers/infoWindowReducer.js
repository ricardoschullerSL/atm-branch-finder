export default function(state= {
    infoId: 0,
    infoObjects:[],
    filteredInfoObjects:[],
    locations: [],
}, action) {
    switch(action.type) {
    case "SET_INFO_VIEW_ITEMS" : {
        return {
            ...state,
            infoItems: action.payload
        };
    }
    case "SET_FILTERED_INFO_OBJECTS": {
        return {
            ...state,
            filteredInfoObjects: action.payload
        };
    }
    case "SET_INFO_OBJECTS" : {
        return {
            ...state,
            infoObjects: action.payload
        };
    }
    case "SET_INFO_ID" : {
        return {
            ...state,
            infoId: action.payload
        };
    }
    case "SET_MAP_LOCATIONS" : {
        return {
            ...state,
            locations: action.payload
        };
    }
    }
    return state;
}