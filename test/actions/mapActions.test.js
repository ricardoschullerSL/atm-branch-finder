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
            expect(mapActions.setInfoObjectLocation()).to.deep.equal({type:"NO_ACTION"});
        });
    });
    describe("setLatitude", () => {
        it("should set latitude", () => {
            const latitude = "0.0";
            expect(mapActions.setLatitude(latitude)).to.deep.equal({type:"SET_INFO_OBJECT_LATITUDE", payload: latitude});
        });
    });
    describe("setLongitude", () => {
        it("should set longitude", () => {
            const longitude = "1.1";
            expect(mapActions.setLongitude(longitude)).to.deep.equal({type:"SET_INFO_OBJECT_LONGITUDE", payload: longitude});
        });
    });
});