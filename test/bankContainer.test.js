import React from "react";
import { BANKDATA } from "../public/js/staticdata/bankData.js"
import BankContainer from "../public/js/containers/BankContainer/";
import BankWindow from "../public/js/components/BankWindow/";
import BankButton from "../public/js/components/BankButton/";

// Setting up Mock Store
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {bankWindow: {
    banks:BANKDATA,
    activeBankId: 0,
    currentAtmId: 0,
    activeEndPoint: "atms"}
};
const store = mockStore(initialState);
const state = store.getState();

describe("BankContainer", () => {
    describe("renders", () => {
        it("a BankWindow", () => {
            const wrapper = shallow(
                <BankContainer store={store} 
                    banks={state.bankWindow.banks} 
                    activeBankId={state.bankWindow.activeBankId} />).shallow();
            expect(wrapper.find("BankWindow")).to.have.length(1);
        });
    });
});

describe("BankWindow", () => {
    describe("renders", () => {
        it("all bank buttons", () => {
            const wrapper = shallow(
                <BankWindow banks={state.bankWindow.banks} 
                            activeBankId={state.bankWindow.activeBankId}/>);
            expect(wrapper.find("td"))
            .to.have.length(initialState.bankWindow.banks.length);
        });
        it("a table", () => {
            const wrapper = shallow(
                <BankWindow banks={state.bankWindow.banks} 
                            activeBankId={state.bankWindow.activeBankId}/>);
            expect(wrapper.find("table")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("class name 'bankWindow'", () => {
            const wrapper = shallow(
                <BankWindow banks={state.bankWindow.banks} 
                            activeBankId={state.bankWindow.activeBankId} />);
            expect(wrapper.find(".bankWindow")).to.have.length(1);
        });
    });
});


describe("BankButton", () => {
    const testBank = {id:"Halifax"};
    
    describe("renders", () => {
        it("the bank ID", () => {
            const wrapper = shallow(<BankButton store={store} bank={testBank} bankId={0} />).shallow();
            expect(wrapper.contains("Halifax")).to.equal(true);
        });
    });
    describe("has property", () => {
        it("class name 'bankButton'", () => {
            const wrapper = shallow(<BankButton store={store} bank={testBank} bankId={0}/>).shallow();
            expect(wrapper.find("div").hasClass("bankButton")).to.equal(true);
        });
    });
});