export default function (state= {
    banks:[{id:"Halifax", uri:"https://api.halifax.co.uk/open-banking/v1.2/atms"}],
    activeBank: 0,
}, action) {
    switch(action.type) {
        case "ADD_BANK" : {
            if (state.banks.find(bank => bank.id === action.payload.id) === -1) {
                return {...state,
                    banks: state.banks.map(bank => bank.id === action.payload.id ?
                    action.payload : bank )
                }
            }
        }
    }
    return state;
}