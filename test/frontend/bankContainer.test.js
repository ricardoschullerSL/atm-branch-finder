import React from "react";
import { Provider } from "react-redux";
import { BANKDATA } from "../../public/js/staticdata/bankData.js"
import BankContainer from "../../public/js/containers/BankContainer/";
import BankWindow from "../../public/js/components/BankWindow/";
import Button from "../../public/js/components/Button/";
import EndPointSelector from "../../public/js/components/EndPointSelector/";


// Setting up Mock Store
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("BankContainer", () => {
    var initialState, store, state;
    beforeEach(() => {
        initialState = 
        {
            bankWindow: {
                banks:BANKDATA,
                activeBankId: 0,
                currentAtmId: 0,
                activeEndPoint: "atms"
            },
            staticInfo: {
                endpoints:[
                    {
                        id:"atms",
                        buttonText:"ATMS",
                    },
                    {
                        id:"branches",
                        buttonText:"Branches",
                    },
                    {
                        id:"pca",
                        buttonText:"PCA"
                    }
                ]
            }
        };
        store = mockStore(initialState);
        state = store.getState();
    });
    describe("renders", () => {
        it("a BankWindow", () => {
            const wrapper = shallow(
                <BankContainer store={store} 
                    banks={state.bankWindow.banks} 
                    activeBankId={state.bankWindow.activeBankId} />).shallow();
            expect(wrapper.find("BankWindow")).to.have.length(1);
        });
    });
    describe("BankWindow", () => {
        describe("renders", () => {
            it("all bank buttons", () => {
                const wrapper = shallow(
                    <BankWindow banks={state.bankWindow.banks} 
                                activeBankId={state.bankWindow.activeBankId}/>);
                expect(wrapper.find("Button"))
                .to.have.length(initialState.bankWindow.banks.length);
            });
            it("a table", () => {
                const wrapper = shallow(
                    <BankWindow banks={state.bankWindow.banks} 
                                activeBankId={state.bankWindow.activeBankId}/>);
                expect(wrapper.find(".bankTable")).to.have.length(1);
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


    describe("Button", () => {
        const testBank = {id:"Halifax"};
        describe("renders", () => {
            it("the bank ID", () => {
                const wrapper = shallow(<Button innerText={testBank.id} />);
                expect(wrapper.contains("Halifax")).to.equal(true);
            });
        });
        describe("has property", () => {
            it("class name 'bankButton'", () => {
                const wrapper = shallow(<Button innerText={testBank.id} className={"bankButton"} />);
                expect(wrapper.find("div").hasClass("bankButton")).to.equal(true);
            });
            it("onClick");
        });
        describe("dispatches", () => {
            it("some actions when clicked", ()=> {
                const wrapper = mount(<BankContainer store={store} />);
                wrapper.find(".bankButton").first().simulate("click");
                expect(store.getActions()).to.deep.equal([{ type: 'SET_ACTIVE_BANK_ID', payload: 0 }])
            })
        })
    });

    describe("EndPointSelector", () => {
        let endpoints;
        beforeEach(() => {
            endpoints= [
                {
                    id:"atms",
                    buttonText:"ATMS",
                },
                {
                    id:"branches",
                    buttonText:"Branches",
                },
                {
                    id:"pca",
                    buttonText:"PCA"
                }
            ]
        })
        describe("renders", () => {
            it("selector buttons", () => {
                const wrapper = shallow(<EndPointSelector endpoints={endpoints} dispatch={store.dispatch} />);
                expect(wrapper.find("Button")).to.have.length(3);
            });
        });
        describe("dispatches actions when you", () => {
            it("click the ATM button", () => {
                const wrapper = mount(<EndPointSelector endpoints={endpoints} dispatch={store.dispatch} />);
                wrapper.find("#atmsSelector").simulate("click");
                expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_ENDPOINT",payload:"atms"}])
            });
            it("click the Branch button", () => {
                const wrapper = mount(<EndPointSelector endpoints={endpoints} dispatch={store.dispatch} />);
                wrapper.find("#branchesSelector").simulate("click");
                expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_ENDPOINT",payload:"branches"}])
            });
            it("click the PCA button", () => {
                const wrapper = mount(<EndPointSelector endpoints={endpoints} dispatch={store.dispatch} />);
                wrapper.find("#pcaSelector").simulate("click");
                expect(store.getActions()).to.deep.equal([{type:"SET_ACTIVE_ENDPOINT",payload:"pca"}])
            });
        });
    });
});