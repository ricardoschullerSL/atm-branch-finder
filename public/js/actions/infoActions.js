import store from "../store";

export function setAtmIdCounter(newId) {
    store.dispatch({type:"SET_ACTIVE_ATM_INDEX", payload: newId});
}

export function decreaseAtmIdCounter() {
    const state = store.getState();
    if (state.infoWindow.filteredATMS) {
        const newCounter = state.infoWindow.activeATMIndex === 0 ? 
                            state.infoWindow.filteredATMS.length - 1 : state.infoWindow.activeATMIndex - 1;
        setAtmIdCounter(newCounter);
    }
};

export function increaseAtmIdCounter() {
    const state = store.getState();
    if (state.infoWindow.filteredATMS) {
        const newCounter = state.infoWindow.activeATMIndex === state.infoWindow.filteredATMS.length - 1?
                            0 : state.infoWindow.activeATMIndex + 1;
        setAtmIdCounter(newCounter);
    }
}