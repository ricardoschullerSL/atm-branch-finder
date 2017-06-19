import store from "../store";

export function setAtmIdCounter(newId) {
    store.dispatch({type:"SET_ACTIVE_ATM_INDEX", payload: newId});
}

export function setInfoId(id) {
    store.dispatch({type:"SET_INFO_ID", payload: id});
}

export function decreaseInfoIdCounter() {
    const state = store.getState();
    if (state.infoWindow.filteredInfoObjects) {
        const newCounter = state.infoWindow.infoId === 0 ? 
                            state.infoWindow.filteredInfoObjects.length - 1 : state.infoWindow.infoId - 1;
        setInfoId(newCounter);
    }
};

export function increaseInfoIdCounter() {
    const state = store.getState();
    if (state.infoWindow.filteredInfoObjects) {
        const newCounter = state.infoWindow.infoId === state.infoWindow.filteredInfoObjects.length - 1?
                            0 : state.infoWindow.infoId + 1;
        setInfoId(newCounter);
    }
}