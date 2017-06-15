import React from "react";
import store from "../public/js/store";
import InfoContainer from "../public/js/containers/InfoContainer/";
import InfoWindow from "../public/js/components/InfoWindow/";
import InfoView from "../public/js/components/InfoView/";
import AtmSelector from "../public/js/components/AtmSelector/";

var state = null;

beforeEach(() => {
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
                    Longitude: "1.1",
                    Latitude: "1.1"
                }
            }
        ];

    state = {
        infoWindow: {
            filteredATMS: testATMS,
            activeATMIndex: 0
        }
    };
});
describe("InfoContainer", () => {
    describe("renders", () => {
        it("an InfoWindow", () => {
            const wrapper = shallow(<InfoContainer store={store} />).shallow();
            expect(wrapper.find("InfoWindow")).to.have.length(1);
        })
    })
})

describe("InfoWindow", () => {
    describe("renders", () => {
        it("an InfoView", () => {
            const wrapper = shallow(
                <InfoWindow filteredATMS={state.infoWindow.filteredATMS}
                        activeATMIndex={state.infoWindow.activeATMIndex} />);
            expect(wrapper.find("InfoView")).to.have.length(1);
            
        });
        it("an AtmSelector", function() {
            const wrapper = shallow(
                <InfoWindow filteredATMS={state.infoWindow.filteredATMS}
                        activeATMIndex={state.infoWindow.activeATMIndex} />);
            expect(wrapper.find("AtmSelector")).to.have.length(1);
        }) 
    })
})

describe("InfoView", () => {        
    describe("renders", () => {
        it("an infoItemList", () => {
            const wrapper = shallow(
                <InfoView filteredATMS={state.infoWindow.filteredATMS}
                        activeATMIndex={state.infoWindow.activeATMIndex} />);
            expect(wrapper.find("ul")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("class name 'infoItemList'", () => {
            const wrapper = shallow(
                <InfoView filteredATMS={state.infoWindow.filteredATMS}
                        activeATMIndex={state.infoWindow.activeATMIndex} />);
            expect(wrapper.find("ul").hasClass("infoItemList")).to.equal(true);
        });
    });
});

describe("AtmSelector", () => {
    describe("renders", () => {
        it("a previous button", () => {
            const wrapper = shallow(<AtmSelector />)
            expect(wrapper.find(".previousButton")).to.have.length(1);
        });
        it("a next button", () => {
            const wrapper = shallow(
                <AtmSelector />)
            expect(wrapper.find(".nextButton")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("class name 'atmSelector'", () => {
            const wrapper = shallow(<AtmSelector />);
            expect(wrapper.find("div").hasClass("atmSelector")).to.equal(true);
        });
    });
});