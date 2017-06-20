import * as bankActions from "../../public/js/actions/bankActions.js";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const addBank = () => ({type: "ADD_BANK"})


describe("Testing mock store", () => {
    it("should dispatch an action", () => {
        const initialState = {};
        const store = mockStore(initialState)
        
        store.dispatch(addBank());
        
        const actions = store.getActions();
        const expectedPayload = {type:"ADD_BANK"};
        expect(actions).to.deep.equal([expectedPayload]);
    });
});
describe("Bank Actions", () => {
    describe("changeActiveBank", () => {
        it("should change activeBankId", () => {
            const initialState = {bankWindow: {activeBankId:0}};
            const store = mockStore(initialState);
            
            store.dispatch(bankActions.changeActiveBank(1))
            expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_BANK_ID", payload:1}])
        });
    });
    describe("setActiveEndPoint", () => {
        it("should change activeEndPoint", () => {
            const initialState = {bankWindow: {activeEndpoint:"atms"}};
            const store = mockStore(initialState);
            store.dispatch(bankActions.setActiveEndPoint("branches"));
            expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_ENDPOINT", payload:"branches"}])
        });
    });
    describe("getEndPointData", () => {
        
    });
    describe("setEndPointData", () => {
        
    });
    describe("filterEndPointData", () => {
        
    });
})