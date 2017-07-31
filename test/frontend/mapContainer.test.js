import React from "react";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
import MapContainer from "../../public/js/containers/MapContainer/";
import MapWindow from "../../public/js/components/MapWindow/";

describe("MapContainer", () => {
    let initialState, store;
    beforeEach(() => {
        initialState = { 
            infoWindow: {
                locations: []
            }
        }
        store = mockStore(initialState);
    });
    describe("renders", () => {
        it("a connected container", () => {
            const wrapper = mount(<MapContainer store={store} />);
            expect(wrapper.find("Connect(MapContainer)")).to.have.length(1);
        })
        it("a Wrapper containing a MapWindow", () => {
            const wrapper = shallow(<MapContainer store={store} />).shallow();
            expect(wrapper.find("Wrapper")).to.have.length(1);
            expect(wrapper.shallow().find("MapWindow")).to.have.length(1);
        });
    });
    describe("MapWindow", () => {
        describe("renders", () => {
            it("a Map component", () => {
                const wrapper = mount(<MapWindow locations={[]} />);
                expect(wrapper.find("Map")).to.have.length(1);
            });
        });
    });
});