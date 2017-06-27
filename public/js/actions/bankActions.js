import axios from "axios";
import store from "../store.js";
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

function filterATMData(data, key, value) {
    const filteredData = data.filter((item) => {
        return (item.Address[key] && value) ? 
                item.Address[key].toUpperCase() === value.toUpperCase() : false;
    });
    
    const filteredInfoObjects = filteredData.map((atm) => {
        atm.infoViewItems = [
            {key:"ATM ID", value:atm.ATMID},
            {key:"Currency", value: atm.Currency[0]},
            {key:"City", value: atm.Address.TownName},
            {key:"Post Code", value: atm.Address.StreetName}
        ]
        return atm
    });
    return {
        type:"SET_FILTERED_INFO_OBJECTS",
        payload: filteredInfoObjects
    };
}

function filterBranchData(data, key, value) {
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