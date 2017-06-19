import React from "react";
import store from "../public/js/store";
import InfoContainer from "../public/js/containers/InfoContainer/";
import InfoWindow from "../public/js/components/InfoWindow/";
import InfoView from "../public/js/components/InfoView/";
import InfoViewSelector from "../public/js/components/InfoViewSelector/";


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
                <InfoWindow filteredInfoObjects={[[{key:"Something", value:"else"}]]}
                        infoId={0} />);
            expect(wrapper.find("InfoView")).to.have.length(1);
            
        });
        it("an InfoViewSelector", function() {
            const wrapper = shallow(
                <InfoWindow filteredInfoObjects={[[{key:"Something", value:"else"}]]}
                        infoId={0} />);
            expect(wrapper.find("InfoViewSelector")).to.have.length(1);
        }) 
    })
})

describe("InfoView", () => {        
    describe("renders", () => {
        it("an infoItemList", () => {
            const wrapper = shallow(
                <InfoView infoObject={{infoViewItems:[{key:"Info1", value:"Test1"}]}}  />);
            expect(wrapper.find("ul")).to.have.length(1);
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
            expect(wrapper.find(".previousButton")).to.have.length(1);
        });
        it("a next button", () => {
            const wrapper = shallow(
                <InfoViewSelector />)
            expect(wrapper.find(".nextButton")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("class name 'infoViewSelector'", () => {
            const wrapper = shallow(<InfoViewSelector />);
            expect(wrapper.find("div").hasClass("infoViewSelector")).to.equal(true);
        });
    });
});