import React from "react";
import store from "../public/js/store.js";
import InfoWindow from "../public/js/components/InfoWindow/InfoWindow.js";

describe("infoWindow", function() {
    describe("renders", function() {
        it("an InfoView", function() {
            const wrapper = shallow(<InfoWindow store={store} />).shallow();
            expect(wrapper.find("InfoView")).to.have.length(1);
            
        })
    })
})