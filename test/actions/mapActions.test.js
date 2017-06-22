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
    describe("setMapCoordinates", () => {
        it("should set map coordinates", () => {
            const initialState = {};
            const store = mockStore(initialState);
            const geographicLocation = {Latitude:"5.1", Longitude:"5.2"};
            store.dispatch(mapActions.setMapCoordinates(geographicLocation));
            expect(store.getActions()).to.deep.equal([{type:"SET_INFO_OBJECT_LATITUDE", payload:geographicLocation.Latitude}, 
            {type:"SET_INFO_OBJECT_LONGITUDE", payload:geographicLocation.Longitude}]);
        });
        it("should add error to log when no location is provided", () => {
            const initialState = {};
            const store = mockStore(initialState);
            store.dispatch(mapActions.setMapCoordinates());
            expect(store.getActions()).to.deep.equal([{type:"ADD_ERROR_TO_LOG", payload:"No geographicLocation object given when setting map coordinates."}])
        })
    });
});