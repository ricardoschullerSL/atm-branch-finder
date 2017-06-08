import React from "react";
import store from "../public/js/store.js";
import BankWindow from "../public/js/components/BankWindow/BankWindow.js";
import BankButton from "../public/js/components/BankWindow/BankButton/BankButton.js";

describe('a passing test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });
});

describe("bankWindow", function() {
    describe("renders", function () {
        it("a bank button", function() {
            const testBank = {id:"Halifax"};
            const wrapper = mount(<BankButton store={store} bank={testBank} bankId={0} />)
            expect((wrapper).find(BankButton)).to.have.length(1);
        });
        
        it("all bank buttons", () => {
            const wrapper = shallow(<BankWindow store={store}/>).shallow();
            expect(wrapper.find("td")).to.have.length(store.getState().bankWindow.banks.length);
        });
    });
});