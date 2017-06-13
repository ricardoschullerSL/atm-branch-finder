import React from "react";
import store from "../public/js/store.js";
import BankWindow from "../public/js/components/BankWindow/";
import BankButton from "../public/js/components/BankButton/";

const state = store.getState();

describe("BankWindow", () => {
    describe("renders", () => {
        it("all bank buttons", () => {
            const wrapper = shallow(<BankWindow banks={state.bankWindow.banks} activeBankId={state.bankWindow.activeBankId}/>).shallow();
            expect(wrapper.find("td")).to.have.length(store.getState().bankWindow.banks.length);
        });
    });
});


describe("BankButton", () => {
    const testBank = {id:"Halifax"};
    
    describe("renders", () => {
        it("the bank ID", () => {
            const wrapper = shallow(<BankButton bank={testBank} bankId={0} />).shallow();
            expect(wrapper.contains("Halifax")).to.equal(true);
        });
    });
    describe("has property", () => {
        it("class name 'bankButton'", () => {
            const wrapper = shallow(<BankButton bank={testBank} bankId={0}/>).shallow();
            expect(wrapper.find("div").hasClass("bankButton")).to.equal(true);
        });
    });
    describe("can", () => {
        it("change activeBankId.", () => {
            state.bankWindow.activeBankId = 1;
            const wrapper = shallow(<BankButton bank={testBank} bankId={0}/>);
            wrapper.simulate("click");
            expect(store.getState().bankWindow.activeBankId).to.equal(0);
        });
    });
});