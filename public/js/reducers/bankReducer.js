import { BANKDATA } from "../staticdata/bankData.js";

export default function (state= {
    banks:BANKDATA,
    activeBankId: 0,
    currentAtmId: 0,
}, action) {
    switch(action.type) {
        
        case "ADD_BANK" : {
            if (state.banks.find(bank => bank.id === action.payload.id) === -1) {
                return state;
            } else {
                let newBanks = state.banks.concat([action.payload]);
                return {
                    ...state,
                    banks: newBanks
                }
            }
        }
        
        case "SET_ACTIVE_BANK_ID" : {
            return {
                ...state,
                activeBankId: action.payload
            }
        }
        
        case "SET_ACTIVE_BANK_DATA" : {
            const newBanks = state.banks.map((bank, i ) => {
                if (i === state.activeBankId) {
                    bank = action.payload;
                } 
                return bank;
            });
            return {
                ...state,
                banks: newBanks
            }    
        }
        
        case "SET_ATM_ID_COUNTER" : {
            return {
                ...state,
                currentAtmId: action.payload
            }
        }
    }
    return state;
}