import axios from "axios";
import { setMapCoordinates } from "./mapActions.js";

export function changeActiveBank(bankId) {
    return {
        type:"SET_ACTIVE_BANK_ID",
        payload: bankId
    };
}

export function setActiveEndPoint(endPoint) {
    return {
        type:"SET_ACTIVE_ENDPOINT",
        payload: endPoint 
    };
}
export function getAllBankData() {
    return (dispatch) => {
        axios.get("/banks")
            .then((result) => {
                dispatch({type:"SET_ALL_BANK_DATA", payload: result.data});
            });
    };
}
export function getSingleBankData(bank) {
    return (dispatch) => {
        let today = new Date(Date.now());
        if (bank.expirationDate
            && today < bank.expirationDate) {
            dispatch({type:"NO_ACTION", payload:"Bank info still valid."});
        } else {
            axios.get("/banks/"+bank.id)
                .then((result) => {
                    bank.data = result.data;
                    bank.expirationDate = new Date(new Date(today).setDate(today.getDate() + 1));
                    dispatch({type:"SET_SINGLE_BANK_DATA", payload: bank});
                });
        }
    };
}

export function getSingleBankSingleEndPointData(bank, endpoint) {
    return (dispatch) => {
        let today = new Date(Date.now());
        if (bank[endpoint].expirationDate
            && today < bank[endpoint].expirationDate) {
            dispatch({type:"NO_ACTION", payload:"Bank info still valid."});
        } else {
            axios.get("/banks/"+bank.id+"/"+endpoint)
                .then((result) => {
                    let endPointData = result.data;
                    let expirationDate = new Date(new Date(today).setDate(today.getDate() + 1));
                    dispatch({type:"SET_SINGLE_BANK_SINGLE_ENDPOINT_DATA", payload: 
                    {
                        bankId:bank.id,
                        endpoint: endpoint,
                        data : {
                            expirationDate: expirationDate,
                            data: endPointData
                        } 
                    }
                    });
                });
        }
    };
}
export function getBankData(bank) {
    return (dispatch) => {
        for (var endPoint in bank.uris) {
            dispatch(getEndPointData(endPoint, bank));
        }
    };
}

export function getEndPointData(endPoint, bank) {    
    return (dispatch) => {
        const endPoint_uri = bank.uris[endPoint];
        const body = {params: {uri : endPoint_uri}};
        if (!bank[endPoint].length) {
            axios.get("/bankdata", body)
                .then((result) => {
                    dispatch(setEndPointData(endPoint, result.data.data));
                    dispatch({type:"SET_INFO_ID", payload:0});
                });
        } else {
            dispatch({type:"SET_INFO_ID", payload:0});
        }
    };
}


export function getATMsByCity(cityName) {
    return (dispatch) => {
        axios.get("/atms/city/" + cityName)
            .then((result) => {
                let locations = extractLocations(result.data);
                dispatch({type:"SET_MAP_LOCATIONS", payload: locations});
            });
    };
}

export function getBranchesByCity(bank, cityName) {
    return (dispatch) => {
        let today = new Date(Date.now());
        if (bank.branches.expirationDate
            && today < bank.branches.expirationDate) {
            dispatch(filterBranchData(bank.branches.data, "TownName", cityName));
        } else {
            axios.get("/banks/"+ bank.id +"/branches/city/"+cityName)
                .then((result) => {
                    dispatch(setFilteredBranches(result.data));
                });
        }
    };
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
        return {type:"NO_ACTION", payload:"No endpoint found"};
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
            return {type:"NO_ACTION", payload:"No filter applied"};
        }
        }
    } else {
        return {type:"NO_ACTION", payload:"No data found"};
    }    
}

export function filterATMData(data, key, value) {
    if (!value) {
        return setFilteredATMs(data);
    }
    const filteredData = data.filter((item) => {
        return (item.Address[key]) ? 
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
                {key:"Post Code", value: atm.Address.PostCode},
                {key:"Distance", value: atm.distance ? (+atm.distance.toFixed(2)*1000).toString() + " meters": null }
            ];
            return atm;
        });
        return {
            type:"SET_FILTERED_INFO_OBJECTS",
            payload: filteredInfoObjects
        };
    } else {
        return {
            type:"NO_ACTION",
            payload:"No ATMs found."
        };
    }
}

export function filterBranchData(data, key, value) {
    if(!value) {
        return setFilteredBranches(data);
    }
    const filteredData = data.filter((item) => {
        return (item.Address[key]) ?
            item.Address[key].toUpperCase() === value.toUpperCase() : false;
    });
    return setFilteredBranches(filteredData);
}

export function setFilteredBranches(branches) {
    if (branches.length > 0) {
        const filteredInfoObjects = branches.map((branch) => {
            branch.infoViewItems = [
                {key:"Branch Name", value: branch.BranchName},
                {key:"Post Code", value: branch.Address.PostCode},
                {key:"Street Name", value: branch.Address.StreetName},
                {key:"Town/City", value: branch.Address.TownName},
            ];
            return branch;
        });
        return {
            type:"SET_FILTERED_INFO_OBJECTS",
            payload: filteredInfoObjects
        };
    } else {
        return {
            type:"NO_ACTION",
            payload:"No Branches found."
        };
    }
}

export function filterATMsByUserPosition(userLocation, maxDistance) {
    return (dispatch) => {
        axios.get("/atms/userlocation/"+userLocation.Latitude+"/"+userLocation.Longitude+"/"+maxDistance)
            .then((result) => {
                let atms = result.data.map((atm) => {
                    atm.distance = Math.sqrt(atm.distanceSquared);
                    return atm;
                });
                atms.sort((a, b) => a.distance - b.distance);
                dispatch(setFilteredATMs(atms));
                let locations = extractLocations(result.data);
                dispatch({type:"SET_MAP_LOCATIONS", payload: locations});
            });
    };
}

export function extractLocations(infoObjects) {
    let locations = infoObjects.map((infoObject) => {   
        return {lat: infoObject.GeographicLocation.Latitude, lng: infoObject.GeographicLocation.Longitude};
    });
    return locations;
}