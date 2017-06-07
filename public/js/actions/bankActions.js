import axios from "axios";
import store from "../store";

export function changeActiveBank(bankId) {
    return {
        type:"SET_ACTIVE_BANK",
        payload: bankId
    };
}

export function getBankData() {
    console.log("getBankData is called!")
    const state = store.getState();
    const bank = state.bankWindow.banks[state.bankWindow.activeBank];
    const ATM_uri = bank.uris.atm;
    axios.get(ATM_uri)
    .then((result) => {
        const newBank = Object.assign({}, bank);
        newBank.data = result.data.data;
        store.dispatch({type:"SET_ACTIVE_BANK_DATA", payload:newBank}) 
    });    
}