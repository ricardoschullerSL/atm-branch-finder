import * as mapActions from "../../public/js/actions/mapActions.js";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("MapActions", () => {
    describe("setATMLocation", () => {
        
    });
    describe("setInfoObjectLocation", () => {
        it("should return no action if no GeographicLocation", () => {
            expect(mapActions.setInfoObjectLocation({test:"Object"})).to.deep.equal({type:"NO_ACTION"});
        });
    });
})