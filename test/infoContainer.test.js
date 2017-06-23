import React from "react";

import InfoContainer from "../public/js/containers/InfoContainer/";
import InfoWindow from "../public/js/components/InfoWindow/";
import InfoView from "../public/js/components/InfoView/";
import InfoViewSelector from "../public/js/components/InfoViewSelector/";
import FilterWindow from "../public/js/components/FilterWindow/";


import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const testATMS = [
        {
            ATMID:"TestATM 1",
            Currency:["GBP"],
            Address: {
                TownName:"Narnia",
                PostCode:"BSBSBS",
                StreetName:"Narnia Street",
            
            },
            GeographicLocation: {
                Longitude: "1.1",
                Latitude: "1.1"
            }
        },
        {
            ATMID:"TestATM 2",
            Currency:["GBP"],
            Address: {
                TownName:"Hogwarts",
                PostCode:"HGHGHG",
                StreetName:"Hogwarts Street",            
            },
            GeographicLocation: {
                Longitude: "2.2",
                Latitude: "2.2"
            }
        }
];

describe("InfoContainer", () => {
    describe("renders", () => {
        it("an InfoWindow", () => {
            const initialState = {infoWindow: {
                                    infoViewItems: [{key:"Info1", value:"Test1"}],
                                    infoId: 0,
                                    infoObjects: testATMS,
                                    filteredInfoObjects: testATMS
                                } 
                                };
            const store = mockStore(initialState);
            const wrapper = shallow(<InfoContainer store={store} />).shallow();
            expect(wrapper.find("InfoWindow")).to.have.length(1);
        })
    })
})

describe("InfoWindow", () => {
    describe("renders", () => {
        it("an InfoView", () => {
            const wrapper = shallow(
                <InfoWindow filteredInfoObjects={[[{key:"Something", value:"else"}]]}
                        infoId={0} />);
            expect(wrapper.find("InfoView")).to.have.length(1);
            
        });
        it("an InfoViewSelector", function() {
            const wrapper = shallow(
                <InfoWindow filteredInfoObjects={[[{key:"Something", value:"else"}]]}
                        infoId={0} />);
            expect(wrapper.find("InfoViewSelector")).to.have.length(1);
        });
        it("nothing when filteredInfoObjects is null", () => {
            const wrapper = shallow (
                <InfoWindow infoId={0} />);
            expect(wrapper.find("InfoView")).to.have.length(0);
        });
    });
});

describe("InfoView", () => {        
    describe("renders", () => {
        it("an infoItemList", () => {
            const wrapper = shallow(
                <InfoView infoObject={{infoViewItems:[{key:"Info1", value:"Test1"}]}}  />);
            expect(wrapper.find("ul")).to.have.length(1);
        });
        it("nothing when infoObject is null", () => {
            const wrapper = shallow(
                <InfoView />
            );
            expect(wrapper.find("ul")).to.have.length(0);
        });
        it("opening times when available", () => {
            const infoObject = {
                infoViewItems:[{key:"Info1", value:"Test1"}],
                OpeningTimes: [{OpeningDay:"Monday", OpeningTime:"09:00.00", ClosingTime:"17:00:00"}]
            }
            const wrapper = shallow(<InfoView infoObject={infoObject} />);
            expect(wrapper.find(".openingTimes")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("class name 'infoItemList'", () => {
            const wrapper = shallow(
                <InfoView infoObject={{infoViewItems:[{key:"Info1", value:"Test1"}]}} />);
            expect(wrapper.find("ul").hasClass("infoItemList")).to.equal(true);
        });
    });
});

describe("InfoViewSelector", () => {
    describe("renders", () => {
        it("a previous button", () => {
            const wrapper = shallow(<InfoViewSelector />)
            expect(wrapper.find("#previous")).to.have.length(1);
        });
        it("a next button", () => {
            const wrapper = shallow(<InfoViewSelector />)
            expect(wrapper.find("#next")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("class name 'infoViewSelector'", () => {
            const wrapper = shallow(<InfoViewSelector />);
            expect(wrapper.find("div").hasClass("infoViewSelector")).to.equal(true);
        });
    });
    describe("dispatches actions when you ", () => {
        it("click the previous button", () => {
            const initialState = {};
            const store = mockStore(initialState);
            const wrapper = shallow(<InfoViewSelector dispatch={store.dispatch} filteredInfoObjects={testATMS} infoId={1} />);
            wrapper.find("#previous").simulate("click");
            expect(store.getActions()).to.deep.equal([{type:"SET_INFO_ID",payload:0},
                                                        {type:"SET_INFO_OBJECT_LATITUDE",payload:"1.1"},
                                                        {type:"SET_INFO_OBJECT_LONGITUDE", payload:"1.1"}])
        });
        it("click the next button", () => {
            const initialState = {};
            const store = mockStore(initialState);
            const wrapper = shallow(<InfoViewSelector dispatch={store.dispatch} filteredInfoObjects={testATMS} infoId={0} />);
            wrapper.find("#next").simulate("click");
            expect(store.getActions()).to.deep.equal([{type:"SET_INFO_ID",payload:1},
                                                        {type:"SET_INFO_OBJECT_LATITUDE",payload:"2.2"},
                                                        {type:"SET_INFO_OBJECT_LONGITUDE", payload:"2.2"}])
        });
    });
});

describe("FilterWindow", () => {
    describe("renders", () => {
        it("a form", () => {
            const initialState = {bankWindow:{
                banks: {},
                activeEndPoint: "atms",
                activeBankId: 0
            }
            }
            const store = mockStore(initialState);
            const wrapper = shallow(<FilterWindow store={store} />).shallow()
            expect(wrapper.find("form")).to.have.length(1);
        });
    });
    describe("dispatches", () => {
        it("filterEndPointData when you submit", () => {
            const initialState = {bankWindow:{
                banks: [{atms:testATMS}],
                activeEndPoint: "atms",
                activeBankId: 0
            }
            }
            const store = mockStore(initialState);
            const wrapper = shallow(<FilterWindow store={store} />).shallow()
            const event = {}
            event.preventDefault = () => {};
            wrapper.find("form").simulate("submit", event)
            expect(store.getActions()).to.deep.equal([{type:"SET_FILTERED_INFO_OBJECTS", payload: []}])
        });
        it("changes state when OnChange is called", () => {
            const initialState = {bankWindow:{
                banks: [{atms:testATMS}],
                activeEndPoint: "atms",
                activeBankId: 0
            }
            }
            const store = mockStore(initialState);
            const wrapper = shallow(<FilterWindow store={store} />).shallow()
            const event = {target:{value:"test"}}
            wrapper.find(".inputBox").simulate("change", event)
            expect(wrapper.state().value).to.equal("test")
        });
    });
});