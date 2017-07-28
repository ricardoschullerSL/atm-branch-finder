import React from "react";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
import MapContainer from "../../public/js/containers/MapContainer";
import MapWindow from "../../public/js/components/MapWindow/";

describe("MapContainer", () => {
    it("Should still be tested", () => {});
})