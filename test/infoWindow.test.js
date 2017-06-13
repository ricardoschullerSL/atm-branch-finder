import React from "react";
import store from "../public/js/store.js";
import InfoWindow from "../public/js/components/InfoWindow/";
import InfoView from "../public/js/components/InfoWindow/InfoView.js";
import AtmSelector from "../public/js/components/InfoWindow/AtmSelector.js";

describe("InfoWindow", function() {
    describe("renders", function() {
        it("an InfoView", function() {
            const wrapper = shallow(<InfoWindow store={store} />).shallow();
            expect(wrapper.find("InfoView")).to.have.length(1);
            
        });
        it("an AtmSelector", function() {
            const wrapper = shallow(<InfoWindow store={store} />).shallow();
            expect(wrapper.find("Connect(AtmSelector)")).to.have.length(1);
        }) 
    })
})

describe("InfoView", () => {
    const testActiveBank = {
        data:[{
            ATMID:"Some ID",
            Currency:["GBP"],
            Address: {
                TownName:"Bristol",
                PostCode:"I don't know",
                StreetName:"What is this?!",
            }
        }]};
        
    describe("renders", () => {
        it("an infoItemList", function() {
            const wrapper = shallow(<InfoView activeBank={testActiveBank} atmId={0} />).shallow();
            expect(wrapper.find("ul")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("class name 'infoItemList'", () => {
            const wrapper = shallow(<InfoView activeBank={testActiveBank} atmId={0} />).shallow();
            expect(wrapper.find("ul").hasClass("infoItemList")).to.equal(true);
        });
    });
});

describe("AtmSelector", () => {
    const testActiveBank = {
        data:[{
            ATMID:"First ID",
            Currency:["GBP"],
            Address: {
                TownName:"Bristol",
                PostCode:"I don't know",
                StreetName:"What is this?!",
            },
            GeographicLocation: {
                Latitude:"0.0",
                Longitude:"1.1"
            }
        },{
            ATMID:"Second ID",
            Currency:["GBP"],
            Address: {
                TownName:"Bristol",
                PostCode:"I don't know",
                StreetName:"What is this?!",
            },
            GeographicLocation: {
                Latitude:"2.2",
                Longitude:"2.2"
            }
        }]};
    describe("renders", () => {
        it("a previous button", () => {
            const wrapper = shallow(<AtmSelector store={store} atmId={0} activeBank={testActiveBank}/>).shallow();
            expect(wrapper.find(".previousButton")).to.have.length(1);
        });
        it("a next button", () => {
            const wrapper = shallow(<AtmSelector store={store} atmId={0} activeBank={testActiveBank}/>).shallow();
            expect(wrapper.find(".nextButton")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("class name 'atmSelector'", () => {
            const wrapper = shallow(<AtmSelector store={store} atmId={0} activeBank={testActiveBank}/>).shallow();
            expect(wrapper.find("div").hasClass("atmSelector")).to.equal(true);
        });
    });
    describe("can", () => {
        it("decrease the ATM ID counter", () => {
            const wrapper = shallow(<AtmSelector store={store} atmId={1} activeBank={testActiveBank}/>).shallow();
            wrapper.find(".previousButton").simulate("click");
            expect(store.getState().bankWindow.currentAtmId).to.equal(0);
        });
        it("increase the ATM ID counter", () => {
            const wrapper = shallow(<AtmSelector store={store} atmId={0} activeBank={testActiveBank}/>).shallow();
            wrapper.find(".previousButton").simulate("click");
            expect(store.getState().bankWindow.currentAtmId).to.equal(1);
        });
            
    });
    
})