import React from "react";
import * as bankActions from "../../public/js/actions/bankActions.js";
import InfoContainer from "../../public/js/containers/InfoContainer/";
import InfoWindow from "../../public/js/components/InfoWindow/";
import InfoView from "../../public/js/components/InfoView/";
import InfoViewSelector from "../../public/js/components/InfoViewSelector/";
import FilterWindow from "../../public/js/components/FilterWindow/";
import DropDownMenu from "../../public/js/components/DropDownMenu/";


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
                                    filteredInfoObjects: testATMS,
                                    
                                },
                                mapWindow:{
                                    userLatitude: "1.1",
                                    userLongitude: "2.2"
                                } 
                                };
            const store = mockStore(initialState);
            const wrapper = shallow(<InfoContainer store={store} />).shallow();
            expect(wrapper.find("InfoWindow")).to.have.length(1);
        });
    });


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
        var store, initialState;
        beforeEach(() => {
            initialState = {};
            store = mockStore(initialState);
        });
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
                const wrapper = shallow(<InfoViewSelector dispatch={store.dispatch} filteredInfoObjects={testATMS} infoId={1} />);
                wrapper.find("#previous").simulate("click");
                expect(store.getActions()).to.deep.equal([{type:"SET_INFO_ID",payload:0},
                                                            {type:"SET_INFO_OBJECT_LATITUDE",payload:"1.1"},
                                                            {type:"SET_INFO_OBJECT_LONGITUDE", payload:"1.1"}])
            });
            it("click the next button", () => {
                const wrapper = shallow(<InfoViewSelector dispatch={store.dispatch} filteredInfoObjects={testATMS} infoId={0} />);
                wrapper.find("#next").simulate("click");
                expect(store.getActions()).to.deep.equal([{type:"SET_INFO_ID",payload:1},
                                                            {type:"SET_INFO_OBJECT_LATITUDE",payload:"2.2"},
                                                            {type:"SET_INFO_OBJECT_LONGITUDE", payload:"2.2"}])
            });
            it("click past the last item", () => {
                const wrapper = shallow(<InfoViewSelector dispatch={store.dispatch} filteredInfoObjects={testATMS} infoId={1} />);
                wrapper.find("#next").simulate("click");
                expect(store.getActions()).to.deep.equal([{type:"SET_INFO_ID",payload:0},
                                                            {type:"SET_INFO_OBJECT_LATITUDE",payload:"1.1"},
                                                            {type:"SET_INFO_OBJECT_LONGITUDE", payload:"1.1"}])
            });
            it("click past the first item", () => {
                const wrapper = shallow(<InfoViewSelector dispatch={store.dispatch} filteredInfoObjects={testATMS} infoId={0} />);
                wrapper.find("#previous").simulate("click");
                expect(store.getActions()).to.deep.equal([{type:"SET_INFO_ID",payload:1},
                                                            {type:"SET_INFO_OBJECT_LATITUDE",payload:"2.2"},
                                                            {type:"SET_INFO_OBJECT_LONGITUDE", payload:"2.2"}])
            });
        });
    });

    describe("FilterWindow", () => {
        var store, initialState;
        beforeEach(() => {
            initialState = {
                bankWindow:{
                    banks: [{atms:testATMS}],
                    activeEndPoint: "atms",
                    activeBankId: 0
                }
            }
            store = mockStore(initialState);
        });
        describe("renders", () => {
            it("a form", () => {
                const wrapper = shallow(<FilterWindow store={store} />).shallow()
                expect(wrapper.find("form")).to.have.length(1);
            });
        });
        describe("dispatches", () => {
            it("filterEndPointData when you submit", () => {
                const getATMsByCity = sinon.stub(bankActions,'getATMsByCity');
                getATMsByCity.returns({"payload": testATMS, "type": "SET_FILTERED_INFO_OBJECTS"});
                const wrapper = shallow(<FilterWindow store={store} />).shallow()
                const event = {}
                event.preventDefault = () => {};
                wrapper.find("form").simulate("submit", event)
                expect(store.getActions()).to.deep.equal([{"payload": testATMS, "type": "SET_FILTERED_INFO_OBJECTS"}, {type:"SET_INFO_ID", payload: 0}])
            });
            it("changes state when OnChange is called", () => {
                const wrapper = shallow(<FilterWindow store={store} />).shallow()
                const event = {target:{value:"test"}}
                wrapper.find(".inputBox").simulate("change", event)
                expect(wrapper.state().value).to.equal("test")
            });
            it("changes state when you select an option in DropDownMenu", () => {
                const wrapper = mount(<FilterWindow store={store} />);
                wrapper.find("DropDownMenu").simulate("change",{target:{value:"TownName"}});
                expect(wrapper.find("DropDownMenu").props().value).to.equal("TownName");
            });
        });
    });

    describe("DropDownMenu", () => {
        describe("renders", () => {
            it("drop down options", () => {
                const options = [{value:"option1", label:"Option 1"}, {value:"option2", label:"Option2"}]
                const wrapper = shallow(<DropDownMenu options={options} value={options[0]} />)
                expect(wrapper.find("option").length).to.equal(2);
            });
            it("a select div", () => {
                const options = [{value:"option1", label:"Option 1"}, {value:"option2", label:"Option2"}]
                const wrapper = shallow(<DropDownMenu name="testDropDown" options={options}/>);
                expect(wrapper.find("select").length).to.equal(1);
            });
        });
        describe("handles", () => {
            it("onChange", () => {
                const options = [{value:"option1", label:"Option 1"}, {value:""}]
                var option = "";
                function setOption (event) {
                    option = event;
                } 
                const wrapper = shallow(<DropDownMenu options={options} value={options[0]} sendOption={setOption} />);
                wrapper.simulate('change', {target:{value:'test'}});
                expect(option).to.equal('test');
            });
        });
    });
});