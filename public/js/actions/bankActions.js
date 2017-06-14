import axios from "axios";
import store from "../store";

export function changeActiveBank(bankId) {
    store.dispatch({
        type:"SET_ACTIVE_BANK_ID",
        payload: bankId
    });
}

export function getBankData() {
    const state = store.getState();
    const bank = state.bankWindow.banks[state.bankWindow.activeBankId];
    const ATM_uri = bank.uris.atm;
    axios.get(ATM_uri)
    .then((result) => {
        store.dispatch({type:"SET_ALL_ATMS", payload:result.data.data})
        filterBankData("TownName", "BRISTOL"); 
    });
        
}

export function filterBankData(key, value) {
    const state = store.getState();
    const filteredData = state.infoWindow.allATMS.filter((item) => {
        return item.Address[key] === value;
    });
    store.dispatch({
        type:"SET_FILTERED_ATMS",
        payload: filteredData
    });
    
}