import axios from "axios";
import { setMapCoordinates } from "./mapActions.js";

export function changeActiveBank(bankId) {
    return {
        type:"SET_ACTIVE_BANK_ID",
        payload: bankId
    }
}

export function setActiveEndPoint(endPoint) {
    return {
        type:"SET_ACTIVE_ENDPOINT",
        payload: endPoint 
    }
}
export function getAllBankData() {
    return (dispatch) => {
        axios.get("/banks")
        .then((result) => {
            console.log(result);
            dispatch({type:"SET_ALL_BANK_DATA", payload: result.data})
        });
    }
}
export function getBankData(bank) {
    return (dispatch) => {
        for (var endPoint in bank.uris) {
            dispatch(getEndPointData(endPoint, bank))
        }
    }
}
export function getEndPointData(endPoint, bank) {    
    return (dispatch) => {
        const endPoint_uri = bank.uris[endPoint];
        const body = {params: {uri : endPoint_uri}};
        if (!bank[endPoint].length) {
            axios.get("/bankdata", body)
            .then((result) => {
                console.log(result);
                console.log("Got endpoint data from bank API.")
                dispatch(setEndPointData(endPoint, result.data.data));
                dispatch({type:"SET_INFO_ID", payload:0});
            });
        } else {
            console.log("Endpoint data already there.")
            dispatch({type:"SET_INFO_ID", payload:0});
        }
    }
}

export function setEndPointData(endPoint, payload) { 
    switch(endPoint) {
        case "atms" : {
            return {type:"SET_ACTIVE_BANK_ATM_DATA", payload: payload};
        }
        case "branches" : {
            return {type:"SET_ACTIVE_BANK_BRANCH_DATA", payload: payload};
        }
        case "pca" : {
            return {type:"SET_ACTIVE_BANK_PCA_DATA", payload: payload};
        }
        default : {
            return {type:"NO_ACTION", payload:"No endpoint found"}
        }
    }
}

export function filterEndPointData(endPoint, data, key, value) {
    if (data.length) {
        switch(endPoint) {
            case "atms" : {
                return filterATMData(data, key, value);
            }
            case "branches": {
                return filterBranchData(data, key, value);
            }
            default : {
                return {type:"NO_ACTION", payload:"No filter applied"}
            }
        }
    } else {
        return {type:"NO_ACTION", payload:"No data found"}
    }    
}

export function filterATMData(data, key, value) {
    const filteredData = data.filter((item) => {
        return (item.Address[key] && value) ? 
                item.Address[key].toUpperCase() === value.toUpperCase() : false;
    });
    
    return setFilteredATMs(filteredData);
}

export function setFilteredATMs(filteredData) {
    if (filteredData.length > 0) {
        const filteredInfoObjects = filteredData.map((atm) => {
            atm.infoViewItems = [
                {key:"ATM ID", value:atm.ATMID},
                {key:"Currency", value: atm.Currency[0]},
                {key:"City", value: atm.Address.TownName},
                {key:"Street Name", value: atm.Address.StreetName},
                {key:"Post Code", value: atm.Address.PostCode}
            ]
            return atm
        });
        return {
            type:"SET_FILTERED_INFO_OBJECTS",
            payload: filteredInfoObjects
        };
    } else {
        return {
            type:"NO_ACTION",
            payload:"No ATMs found."
        }
    }
}

export function filterBranchData(data, key, value) {
    const filteredData = data.filter((item) => {
        return (item.Address[key] && value) ?
            item.Address[key].toUpperCase() === value.toUpperCase() : false;
    });
    
    const filteredInfoObjects = filteredData.map((branch) => {
        branch.infoViewItems = [
            {key:"Branch Name", value: branch.BranchName},
            {key:"Post Code", value: branch.Address.PostCode},
            {key:"Street Name", value: branch.Address.StreetName},
            {key:"Town/City", value: branch.Address.TownName},
        ];
        return branch
    })
    return {
        type:"SET_FILTERED_INFO_OBJECTS",
        payload: filteredInfoObjects
    }
}

export function filterATMsByUserPosition(data, userLocation, maxDistance) {
    const filteredData = data.filter((item) => {
        return (Math.abs(item.GeographicLocation.Longitude - userLocation.Longitude) < maxDistance &&
                Math.abs(item.GeographicLocation.Latitude - userLocation.Latitude) < maxDistance)
    });
    return setFilteredATMs(filteredData);
}
