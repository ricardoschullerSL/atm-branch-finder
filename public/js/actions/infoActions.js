import store from "../store";

export function setInfoIndex(id) {
    return {type:"SET_INFO_ID", payload: id}
}

export function decreaseInfoIndex() {
    const state = store.getState();
    if (state.infoWindow.filteredInfoObjects) {
        const newCounter = state.infoWindow.infoId === 0 ? 
                            state.infoWindow.filteredInfoObjects.length - 1 : state.infoWindow.infoId - 1;
        return setInfoIndex(newCounter);
    }
};

export function increaseInfoIndex() {
    const state = store.getState();
    if (state.infoWindow.filteredInfoObjects) {
        const newCounter = state.infoWindow.infoId === state.infoWindow.filteredInfoObjects.length - 1 ?
                            0 : state.infoWindow.infoId + 1;
        return setInfoIndex(newCounter);
    }
}

export function setInfoObjects(infoObjects) {
    return {type:"SET_INFO_OBJECTS", payload: infoObjects}
}