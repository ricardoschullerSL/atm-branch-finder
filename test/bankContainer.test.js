import React from "react";
import { BANKDATA } from "../public/js/staticdata/bankData.js"
import BankContainer from "../public/js/containers/BankContainer/";
import BankWindow from "../public/js/components/BankWindow/";
import BankButton from "../public/js/components/BankButton/";
import EndPointSelector from "../public/js/components/EndPointSelector/";

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
        it("nothing if no banks are found", () => {
            const wrapper = shallow(<BankWindow activeBankId={0} />);
            expect(wrapper.find("td")).to.have.length(0);
        })
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
    describe("dispatches", () => {
        it("setActiveBank", () => {
            const store = mockStore(initialState);
            const wrapper = shallow(<BankButton store={store} bank={testBank} bankId={0} />).shallow();
            wrapper.find(".bankButton").simulate("click");
            expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_BANK_ID", payload: 0}])
        })
    })
});

describe("EndPointSelector", () => {
    describe("renders", () => {
        it("selector buttons", () => {
            const wrapper = shallow(<EndPointSelector dispatch={store.dispatch} />);
            expect(wrapper.find(".endpointselector")).to.have.length(3);
        });
    });
    describe("dispatches actions when you", () => {
        it("click the ATM button", () => {
            const store = mockStore(initialState);
            const wrapper = shallow(<EndPointSelector dispatch={store.dispatch} />);
            wrapper.find("#atmSelector").simulate("click");
            expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_ENDPOINT",payload:"atms"}])
        });
        it("click the Branch button", () => {
            const store = mockStore(initialState);
            const wrapper = shallow(<EndPointSelector dispatch={store.dispatch} />);
            wrapper.find("#branchSelector").simulate("click");
            expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_ENDPOINT",payload:"branches"}])
        });
        it("click the PCA button", () => {
            const store = mockStore(initialState);
            const wrapper = shallow(<EndPointSelector dispatch={store.dispatch} />);
            wrapper.find("#pcaSelector").simulate("click");
            expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_ENDPOINT",payload:"pca"}])
        });
    })
});