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
            const initialState = {bankWindow: {activeEndPoint:"atms"}};
            const store = mockStore(initialState);
            store.dispatch(bankActions.setActiveEndPoint("branches"));
            expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_ENDPOINT", payload:"branches"}])
        });
    });
    describe("getBankData", () => {
        
        
    });
    describe("setEndPointData", () => {
        it("should set ATM data", () => {
            const initialState= {bankWindow: {activeEndPoint:"atms"}};
            const store = mockStore(initialState);
            const data = ["Something"]
            store.dispatch(bankActions.setEndPointData("atms", data));
            expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_BANK_ATM_DATA", payload:data}]);
        });
        it("should set Branch data", () => {
            const initialState= {bankWindow: {activeEndPoint:"branches"}};
            const store = mockStore(initialState);
            const data = ["Something"]
            store.dispatch(bankActions.setEndPointData("branches", data));
            expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_BANK_BRANCH_DATA", payload:data}]);
        });
        it("should set PCA data", () => {
            const initialState= {bankWindow: {activeEndPoint:"pca"}};
            const store = mockStore(initialState);
            const data = ["Something"]
            store.dispatch(bankActions.setEndPointData("pca", data));
            expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_BANK_PCA_DATA", payload:data}]);
        });
        it("should return NO_ACTION by default", () => {
            const initialState= {bankWindow: {activeEndPoint:""}};
            const store = mockStore(initialState);
            const data = ["Something"]
            store.dispatch(bankActions.setEndPointData(null, data));
            expect(store.getActions()).to.deep.equal([{type:"NO_ACTION"}]);
        });
    });
    describe("filterEndPointData", () => {
        it("should return NO_ACTION by default", () => {
            const initialState= {bankWindow: {activeEndPoint:""}};
            const store = mockStore(initialState);
            const data = [{Address:{TownName:"Bristol"}}, {Address:{TownName:"Bristol"}}];
            store.dispatch(bankActions.filterEndPointData(null, data, "TownName","Bristol"));
            expect(store.getActions()).to.deep.equal([{type:"NO_ACTION", payload:"No filter applied"}]);
        });
        it("should filter ATM data", () => {
            const initialState= {bankWindow: {activeEndPoint:""}};
            const store = mockStore(initialState);
            const data = [
                {
                    ATMID:"TestATM1",
                    Address:{TownName:"London", StreetName:"25 Buckingham Palace"},
                    Currency:["GBP"],
                    
                },
                {
                    ATMID:"TestATM2",
                    Address:{TownName:"Bristol", StreetName:"25 King Street"},
                    Currency:["GBP"],
                    
                }];
            store.dispatch(bankActions.filterEndPointData("atms", data, "TownName", "Bristol"));
            expect(store.getActions()).to.deep.equal([{type:"SET_FILTERED_INFO_OBJECTS", payload:  [data[1]]}])
        });
        it("should filter Branch data", () => {
            const initialState= {bankWindow: {activeEndPoint:"branches"}};
            const store = mockStore(initialState);
            const data = [
                {
                    BranchName:"Test Branch 1",
                    Address:{TownName:"London", StreetName:"25 Buckingham Palace", PostCode:"LB121212"},                
                },
                {
                    BranchName:"Test Branch 2",
                    Address:{TownName:"Bristol", StreetName:"25 King Street", PostCode:"BS151515"},
                }];
            store.dispatch(bankActions.filterEndPointData("branches", data, "TownName", "Bristol"));
            expect(store.getActions()).to.deep.equal([{type:"SET_FILTERED_INFO_OBJECTS", payload: [data[1]]}])
        });
    });
})