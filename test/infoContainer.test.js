import React from "react";
import store from "../public/js/store.js";
import InfoContainer from "../public/js/containers/InfoContainer/";
import InfoWindow from "../public/js/components/InfoWindow/";
import InfoView from "../public/js/components/InfoWindow/InfoView.js";
import AtmSelector from "../public/js/components/AtmSelector/";

describe("InfoContainer", () => {
    describe("renders", () => {
        it("an InfoWindow", () => {
            const wrapper = shallow(<InfoContainer store={store} />).shallow();
            expect(wrapper.find("InfoWindow")).to.have.length(1);
        })
    })
})

describe("InfoWindow", function() {
    describe("renders", function() {
        const s = {
            atm: {
                location: {
                    city:"",
                    street:"",
                    postcode:"",
                    latitude:"",
                    longitude:""
                }
            },
            infoItems: [{id:"Info1", type:"Something", value:"Test1"}],
            banks: [{id:"Halifax"}],
            activeBankId: 0,
            currentAtmId: 0,
        }
        it("an InfoView", function() {
            const wrapper = shallow(<InfoWindow atm={s.atm}
                                                infoItems={s.infoItems} 
                                                banks={s.banks} 
                                                activeBankId={s.activeBankId}
                                                currentAtmId={s.currentAtmId} 
                                            />);
            expect(wrapper.find("InfoView")).to.have.length(1);
            
        });
        it("an AtmSelector", function() {
            const wrapper = shallow(<InfoWindow atm={s.atm}
                                                infoItems={s.infoItems} 
                                                banks={s.banks} 
                                                activeBankId={s.activeBankId}
                                                currentAtmId={s.currentAtmId} 
                                            />);
            expect(wrapper.find("AtmSelector")).to.have.length(1);
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
            const wrapper = shallow(<InfoView activeBank={testActiveBank} atmId={0} />);
            expect(wrapper.find("ul")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("class name 'infoItemList'", () => {
            const wrapper = shallow(<InfoView activeBank={testActiveBank} atmId={0} />);
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
            const wrapper = shallow(<AtmSelector atmId={0} 
                                                activeBank={testActiveBank}/>)
            expect(wrapper.find(".previousButton")).to.have.length(1);
        });
        it("a next button", () => {
            const wrapper = shallow(
                <AtmSelector atmId={0} activeBank={testActiveBank}/>)
            expect(wrapper.find(".nextButton")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("class name 'atmSelector'", () => {
            const wrapper = shallow(<AtmSelector atmId={0}
                                                activeBank={testActiveBank}/>);
            expect(wrapper.find("div").hasClass("atmSelector")).to.equal(true);
        });
    });
    describe("can", () => {
        it("decrease the ATM ID counter", () => {
            const wrapper = shallow(<AtmSelector atmId={1} 
                                                activeBank={testActiveBank}/>);
            wrapper.find(".previousButton").simulate("click");
            expect(store.getState().bankWindow.currentAtmId).to.equal(0);
        });
        it("increase the ATM ID counter", () => {
            const wrapper = shallow(<AtmSelector atmId={0} 
                                                activeBank={testActiveBank}/>);
            wrapper.find(".previousButton").simulate("click");
            expect(store.getState().bankWindow.currentAtmId).to.equal(1);
        });
            
    });
    
})