import React from "react";
import store from "../public/js/store.js";
import MapWindow from "../public/js/components/MapWindow/MapWindow.js";

describe("mapWindow", function() {
    describe("renders", function() {
        it("the mapWindow div", function() {
            const wrapper = shallow(<MapWindow store={store} />).shallow();
            expect(wrapper.hasClass("mapWindow")).to.equal(true);
        });
        it("the Google iframe", function() {
            const wrapper = shallow(<MapWindow store={store} />).shallow();
            expect(wrapper.find("iframe")).to.have.length(1);
        })
    })
})