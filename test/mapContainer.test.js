import React from "react";
import store from "../public/js/store.js";
import MapContainer from "../public/js/containers/MapContainer";
import MapWindow from "../public/js/components/MapWindow/";

describe("MapContainer", () => {
    describe("renders", () => {
        it("a MapWindow", () => {
            const wrapper = shallow(<MapContainer store={store} />).shallow();
            expect(wrapper.find("MapWindow")).to.have.length(1);
        });
    });
});
describe("MapWindow", () => {
    describe("renders", () => {
        it("the mapWindow div", () => {
            const wrapper = shallow(<MapWindow />);
            expect(wrapper.hasClass("mapWindow")).to.equal(true);
        });
        it("the Google iframe", () => {
            const wrapper = shallow(<MapWindow />);
            expect(wrapper.find("iframe")).to.have.length(1);
        })
    })
})