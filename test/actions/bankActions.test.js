import * as bankActions from "../../public/js/actions/bankActions.js";
import axios from "axios";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let sandbox;

describe("Bank Actions", () => {
    beforeEach(() => {sandbox = sinon.sandbox.create()});
    afterEach(() => {sandbox.restore()});
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
    describe("getAllBankData", () => {
        it("should return all bank data in a single action.", (done) => {
            const store = mockStore({});
            const fakeAxios = new Promise((r) => r({ data: ["testBanks"] }));
            sandbox.stub(axios, 'get').returns(fakeAxios);
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.getAllBankData()));
            })
            waitForActions
            .then((result)=> {
                expect(store.getActions()).to.deep.equal([{type:"SET_ALL_BANK_DATA", payload:["testBanks"]}]);
            })
            .then(done,done);
        });
    });
    describe("getBankData", () => {
        it("should call getEndPointData for every bank uri", (done) => {
            const store = mockStore({});
            const fakeAxios = new Promise((r) => r({ data: {data:["testBanks"]}}));
            sandbox.stub(axios, 'get').returns(fakeAxios);
            const testBank = {
                id:"testBank",
                uris: {
                    atms:"testlink",
                    pca:"testlink2"
                },
                atms:[],
                pca:[]
            };
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.getBankData(testBank)))
            });
            waitForActions
            .then((result) => {
                expect(store.getActions().length).to.equal(4);
            })
            .then(done,done);
        });
        it("should not retrieve data when it's already there.", (done) => {
            const store = mockStore({});
            const fakeAxios = new Promise((r) => r({ data: {data:["testBanks"]}}));
            sandbox.stub(axios, 'get').returns(fakeAxios);
            const testBank = {
                id:"testBank",
                uris: {
                    atms:"testlink",
                    pca:"testlink2"
                },
                atms:["Fake Data"],
                pca:["Fake Data"]
            };
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.getBankData(testBank)))
            });
            waitForActions
            .then((result) => {
                expect(store.getActions().length).to.equal(2);
            })
            .then(done,done);
        });
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
            expect(store.getActions()).to.deep.equal([{type:"NO_ACTION", payload:"No endpoint found"}]);
        });
    });
    describe("filterEndPointData", () => {
        it("should return NO_ACTION if no endpoint given", () => {
            const initialState= {bankWindow: {activeEndPoint:""}};
            const store = mockStore(initialState);
            const data = [{Address:{TownName:"Bristol"}}, {Address:{TownName:"Bristol"}}];
            store.dispatch(bankActions.filterEndPointData(null, data, "TownName","Bristol"));
            expect(store.getActions()).to.deep.equal([{type:"NO_ACTION", payload:"No filter applied"}]);
        });
        it("should return NO_ACTION if no data found", () => {
            const initialState= {bankWindow: {activeEndPoint:""}};
            const store = mockStore(initialState);
            const data = [];
            store.dispatch(bankActions.filterEndPointData("atm", data, "TownName","Bristol"));
            expect(store.getActions()).to.deep.equal([{type:"NO_ACTION", payload:"No data found"}]);
        })
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
        it("should not filter ATM data is no value is given, ie return all data.", () => {
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
            store.dispatch(bankActions.filterEndPointData("atms", data, "TownName", null));
            expect(store.getActions()).to.deep.equal([{"payload": data, "type": "SET_FILTERED_INFO_OBJECTS"}])
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
        it("should not filter Branch data when no value is given", () => {
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
            store.dispatch(bankActions.filterEndPointData("branches", data, "TownName", null));
            expect(store.getActions()).to.deep.equal([{type:"SET_FILTERED_INFO_OBJECTS", payload: data}])
        });
    });
    describe("filterATMsByUserPosition", () => {
        it("should filter ATM by user location and max distance", (done) => {
            const testData = [
                {
                    ATMID:"TestATM1",
                    Currency:["GBP"],
                    Address: {
                        TownName:"Bristol",
                        StreetName:"King Street",
                        PostCode:"BS151515"
                    },
                    GeographicLocation: {
                        Longitude:"2.2",
                        Latitude:"0.1"
                    }
                },
                {
                    ATMID:"TestATM2",
                    Currency:["GBP"],
                    Address: {
                        TownName:"Bristol",
                        StreetName:"Queen Park",
                        PostCode:"BS111111"
                    },
                    GeographicLocation: {
                        Longitude:"10",
                        Latitude:"10"
                    }
                }
            ];
            const userLocation = {
                Longitude: "0.0",
                Latitude: "1.1"
            };
            const store = mockStore({});
            const fakeAxios = new Promise((r) => r({ data: testData.slice(0,1)}));
            sandbox.stub(axios, 'get').returns(fakeAxios);
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.filterATMsByUserPosition(userLocation, 5)));
            });
            waitForActions.then((result) => {
                console.log(result);
                expect(store.getActions()).to.deep.equal([{
                    type:"SET_FILTERED_INFO_OBJECTS",
                    payload: [ {
                        ATMID:"TestATM1",
                        Address: {
                            PostCode:"BS151515",
                            StreetName:"King Street",
                            TownName:"Bristol"
                        },
                        Currency: ["GBP"],
                        GeographicLocation: {
                            Longitude:"2.2",
                            Latitude:"0.1"
                        },
                        infoViewItems: [
                            {key:"ATM ID", value:"TestATM1"},
                            {key:"Currency", value:"GBP"},
                            {key:"City", value:"Bristol"},
                            {key:"Street Name", value:"King Street"},
                            {key:"Post Code", value:"BS151515"}
                        ]
                    }]
                }])
            })
            .then(done,done);
        });
    });
});