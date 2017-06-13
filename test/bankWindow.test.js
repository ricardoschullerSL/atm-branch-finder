import React from "react";
import store from "../public/js/store.js";
import BankWindow from "../public/js/components/BankWindow/BankWindow.js";
import BankButton from "../public/js/components/BankWindow/BankButton/BankButton.js";



describe("BankWindow", () => {
    describe("renders", () => {
        it("all bank buttons", () => {
            const wrapper = shallow(<BankWindow store={store}/>).shallow();
            expect(wrapper.find("td")).to.have.length(store.getState().bankWindow.banks.length);
        });
    });
});


describe("BankButton", () => {
    const testBank = {id:"Halifax"};
    
    describe("renders", () => {
        it("a bankButton", () => {
            const wrapper = shallow(<BankButton store={store} bank={testBank} />);
            expect(wrapper.find("BankButton")).to.have.length(1);
        });
        it("the bank ID", () => {
            const wrapper = shallow(<BankButton store={store} bank={testBank} />).shallow();
            expect(wrapper.contains("Halifax")).to.equal(true);
        });
    });
    describe("has property", () => {
        it("class name 'bankButton'", () => {
            const wrapper = shallow(<BankButton store={store} bank={testBank} />).shallow();
            expect(wrapper.find("div").hasClass("bankButton")).to.equal(true);
        });
    });
});