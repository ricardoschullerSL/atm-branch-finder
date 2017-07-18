import React from "react";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
import MapContainer from "../../public/js/containers/MapContainer";
import MapWindow from "../../public/js/components/MapWindow/";

describe("MapContainer", () => {
    describe("renders", () => {
        it("a MapWindow", () => {
            const initialState = {
                mapWindow: {
                    latitude: "1.1",
                    longitude: "2.2"
                }
            };
            const store = mockStore(initialState);
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