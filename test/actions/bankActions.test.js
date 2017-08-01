import * as bankActions from "../../public/js/actions/bankActions.js";
import axios from "axios";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let sandbox;

describe("Bank Actions", () => {
    let branches, atms, store;
    beforeEach(() => {
        store = mockStore({});
        sandbox = sinon.sandbox.create()
        branches = [
            {
                BranchName:"TestBranch1",
                Address:{TownName:"London", StreetName:"25 Buckingham Palace", PostCode:"LO15151515"},
                GeographicLocation: {Latitude:"2.2", Longitude:"2.2"},                    
            },
            {
                BranchName:"TestBranch2",
                Address:{TownName:"Bristol", StreetName:"25 King Street", PostCode:"BS15151515"},
                GeographicLocation: {Latitude:"1.1", Longitude:"1.1"},
            }];
        atms = [
                {
                    ATMID:"TestATM1",
                    Address:{TownName:"London", StreetName:"25 Buckingham Palace"},
                    GeographicLocation: {Latitude:"1.1", Longitude: "1.1"},
                    Currency:["GBP"],
                    distance:1
                    
                },
                {
                    ATMID:"TestATM2",
                    Address:{TownName:"Bristol", StreetName:"25 King Street"},
                    GeographicLocation: {Latitude:"2.2", Longitude: "2.2"},
                    Currency:["GBP"],
                    distance:2
                    
                }];
    });
    
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
    describe("getSingleBankData", () => {
        it("should return single bank data in a single action.", (done) => {
            const testBank = {expirationDate:new Date(0)}
            const store = mockStore({});
            const fakeAxios = new Promise((r) => r({ data: ["singleBank"] }));
            sandbox.stub(axios, 'get').returns(fakeAxios);
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.getSingleBankData(testBank)));
            })
            waitForActions
            .then((result)=> {
                expect(store.getActions()[0].type).to.equal("SET_SINGLE_BANK_DATA")
            })
            .then(done,done);
        });
        it("should dispatch NO_ACTION when data is within refresh date.", (done) => {
            let today = new Date(Date.now());
            const testBank = {expirationDate: new Date(new Date(today).setDate(today.getDate() +1))}
            const store = mockStore({});
            const fakeAxios = new Promise((r) => r({ data: ["singleBank"] }));
            sandbox.stub(axios, 'get').returns(fakeAxios);
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.getSingleBankData(testBank)));
            })
            waitForActions
            .then((result)=> {
                expect(store.getActions()).to.deep.equal([{type:"NO_ACTION", payload:"Bank info still valid."}]);
            })
            .then(done,done);
        });
    });
    describe("getSingleBankSingleEndPointData", () => {
        it("should return single bank single endpoint data in a single action.", (done) => {
            const testBank = {id:"Halifax", atms:{expirationDate:0}}
            const store = mockStore({});
            const fakeAxios = new Promise((r) => r({ data: ["singleBank"] }));
            sandbox.stub(axios, 'get').returns(fakeAxios);
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.getSingleBankSingleEndPointData(testBank, "atms")));
            })
            waitForActions
            .then((result)=> {
                expect(store.getActions()[0].type).to.equal("SET_SINGLE_BANK_SINGLE_ENDPOINT_DATA");
            })
            .then(done,done);
        });
        it("should return NO_ACTION if data is still valid.", (done) => {
            let today = new Date(Date.now());
            let expirationDate = new Date(today.setDate(today.getDate() + 1))
            const testBank = {id:"Halifax", atms:{expirationDate:expirationDate}}
            const store = mockStore({});
            const fakeAxios = new Promise((r) => r({ data: ["singleBank"] }));
            sandbox.stub(axios, 'get').returns(fakeAxios);
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.getSingleBankSingleEndPointData(testBank, "atms")));
            })
            waitForActions
            .then((result)=> {
                expect(store.getActions()).to.deep.equal([{type:"NO_ACTION", payload:"Bank info still valid."}]);
            })
            .then(done,done);
        });
    })
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
    describe("getATMsByCity", () => {
        it("should return all ATMs in some city and set map coordinates to the first one", (done) => {
            const store = mockStore({});
            const fakeAxios = new Promise((r) => r({data:[atms[1]]}));
            sandbox.stub(axios, "get").returns(fakeAxios);
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.getATMsByCity("Bristol")))
            });
            waitForActions
            .then((result) => {
                expect(store.getActions()).to.deep.equal([{type:"SET_MAP_LOCATIONS", payload:[{lat:"2.2", lng:"2.2"}]}]);
            })
            .then(done,done);
        });
    });
    describe("getBranchesByCity", () => {
        it("should check expiration date on bank branch data and retrieve new data if not valid and set map coordinates", (done) => {
            const testBank = {id:"Halifax", branches:{expirationDate:new Date(0), data: null}};
            const fakeAxios = new Promise((r) => r({data:branches}));
            sandbox.stub(axios, "get").returns(fakeAxios);
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.getBranchesByCity(testBank, "Bristol")))
            });
            waitForActions
            .then((result) => {
                expect(store.getActions().length).to.equal(1);
            })
            .then(done,done);
        });
        it("should use cached branch data if valid and filter that and set map coordinates", () => {
            const store = mockStore({});
            const today = new Date(Date.now());
            const tomorrow = new Date(new Date(today).setDate(today.getDate() + 1));
            const testBank = {id:"Halifax", branches:{expirationDate:tomorrow, data:[branches[1]]}};
            store.dispatch(bankActions.getBranchesByCity(testBank, "Bristol"));
            expect(store.getActions().length).to.equal(1);
        })
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
            const data = [{Address:{TownName:"Bristol"},distance:0.1}, {Address:{TownName:"Bristol"},distance:0.2}];
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
            store.dispatch(bankActions.filterEndPointData("atms", atms, "TownName", "Bristol"));
            expect(store.getActions()).to.deep.equal([{type:"SET_FILTERED_INFO_OBJECTS", payload:  [atms[1]]}])
        });
        it("should not filter ATM data is no value is given, ie return all data", () => {
            const initialState= {bankWindow: {activeEndPoint:""}};
            const store = mockStore(initialState);
            store.dispatch(bankActions.filterEndPointData("atms", atms, "TownName", null));
            expect(store.getActions()).to.deep.equal([{"payload": atms, "type": "SET_FILTERED_INFO_OBJECTS"}])
        });
        it("should not return ATMs if Address[key] is null", () => {
            const store = mockStore({});
            const badAtms = atms.map((atm) => {
                atm.Address["TownName"] = null;
                return atm;
            });
            store.dispatch(bankActions.filterEndPointData("atms", badAtms, "TownName", "Bristol"));
            expect(store.getActions()).to.deep.equal([{payload:"No ATMs found.", type:"NO_ACTION"}]);
        });
        it("should filter Branch data", () => {
            const initialState= {bankWindow: {activeEndPoint:"branches"}};
            const store = mockStore(initialState);
            store.dispatch(bankActions.filterEndPointData("branches", branches, "TownName", "Bristol"));
            expect(store.getActions()).to.deep.equal([{type:"SET_FILTERED_INFO_OBJECTS", payload: [branches[1]]}]);
        });
        it("should not filter Branch data when no value is given", () => {
            const initialState= {bankWindow: {activeEndPoint:"branches"}};
            const store = mockStore(initialState);
            store.dispatch(bankActions.filterEndPointData("branches", branches, "TownName", null));
            expect(store.getActions()).to.deep.equal([{type:"SET_FILTERED_INFO_OBJECTS", payload: branches}])
        });
        it("should not return Branch data if Address[key] is null", () => {
            const store = mockStore({});
            const badBranches = branches.map((branch) => {
                branch.Address["TownName"] = null;
                return branch;
            });
            store.dispatch(bankActions.filterEndPointData("branches", branches, "TownName", "Bristol"));
            expect(store.getActions()).to.deep.equal([{payload:"No Branches found.", type:"NO_ACTION"}]);
        });
    });
    describe("setFilteredATMS", () => {
        it("should not set infoObjects if data is empty", () => {
            const initialState = {infoWindow: {}};
            const store = mockStore(initialState);
            const filteredData = [];
            store.dispatch(bankActions.setFilteredATMs(filteredData));
            expect(store.getActions()).to.deep.equal([{type:"NO_ACTION", payload:"No ATMs found."}]);
        })
    })
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
                    },
                    distanceSquared: "0.01",
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
                    },
                    distanceSquared:"49",
                },
                {
                    ATMID:"TestATM3",
                    Currency:["GBP"],
                    Address: {
                        TownName:"Bristol",
                        StreetName:"Queen Park",
                        PostCode:"BS111111"
                    },
                    GeographicLocation: {
                        Longitude:"10",
                        Latitude:"10"
                    },
                    distanceSquared:"64",
                }
            ];
            const userLocation = {
                Longitude: "0.0",
                Latitude: "1.1"
            };
            const store = mockStore({});
            const fakeAxios = new Promise((r) => r({ data: testData.slice(0,2)}));
            sandbox.stub(axios, 'get').returns(fakeAxios);
            const waitForActions = new Promise((resolve) => {
                resolve(store.dispatch(bankActions.filterATMsByUserPosition(userLocation, 7.5)));
            });
            waitForActions.then((result) => {
                expect(store.getActions()).to.deep.equal(
                    [
                        {
                            type:"SET_FILTERED_INFO_OBJECTS",
                            payload: [ {
                                ATMID:"TestATM1",
                                Address: {
                                    PostCode:"BS151515",
                                    StreetName:"King Street",
                                    TownName:"Bristol"
                                },
                                distance:0.1,
                                distanceSquared:"0.01",
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
                                    {key:"Post Code", value:"BS151515"},
                                    {key:"Distance", value:"100 meters"}
                                ]
                            },{
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
                                },
                                distanceSquared:"49",
                                distance:7,
                                infoViewItems: [
                                    {key:"ATM ID", value:"TestATM2"},
                                    {key:"Currency", value:"GBP"},
                                    {key:"City", value:"Bristol"},
                                    {key:"Street Name", value:"Queen Park"},
                                    {key:"Post Code", value:"BS111111"},
                                    {key:"Distance", value:"7000 meters"}
                                    
                                ]
                            }
                        ]
                        },
                        {
                            payload:[
                                {
                                    "lat": "0.1",
                                    "lng": "2.2"
                                },
                                {
                                    "lat": "10",
                                    "lng": "10"
                                }
                            ],
                            type:"SET_MAP_LOCATIONS"
                        }
                    ]
                )
            })
            .then(done,done);
        });
    });
});