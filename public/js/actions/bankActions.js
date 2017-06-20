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

export function getEndPointData(endPoint) {    
    return (dispatch) => {
        if (!endPoint) {
            endPoint = store.getState().bankWindow.activeEndPoint;
        }
        const bank = store.getState().bankWindow.banks[store.getState().bankWindow.activeBankId];
        const endPoint_uri = bank.uris[endPoint];
        if (!bank[endPoint]) {
            axios.get(endPoint_uri)
            .then((result) => {
                console.log("Got endpoint data from bank API.")
                dispatch(setEndPointData(endPoint, result.data.data));
                dispatch(filterEndPointData(endPoint, result.data.data, "TownName", "Bristol"));
                dispatch({type:"SET_INFO_ID", payload:0});
            });
        } else {
            console.log("Endpoint data already there.")
            dispatch({type:"SET_INFO_ID", payload:0});
        }
    }
}

export function setEndPointData(endPoint, payload) {
    if (!endPoint) {
        endPoint = store.getState().bankWindow.activeEndPoint;
    }
    switch(endPoint) {
        case "atms" : {
            return {type:"SET_ACTIVE_BANK_ATM_DATA", payload: payload};
        }
        case "branches" : {
            return {type:"SET_ACTIVE_BANK_BRANCH_DATA", payload: payload};
        }
    }
    console.log("setEndPointData called"); 
}

export function filterEndPointData(endPoint, data, key, value) {
    if (!endPoint) {
        endPoint = store.getState().bankWindow.activeEndPoint;
    }
    const state = store.getState();
    switch(endPoint) {
        case "atms" : {
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
        case "branches": {
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
        default : {
            console.log("Something went wrong, didn't filter the data");
        }
    }    
}

