import * as mapActions from "../../public/js/actions/mapActions.js";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("MapActions", () => {
    describe("setInfoObjectLocation", () => {
        it("should return NO ACTION if no InfoObject is given", () => {
            expect(mapActions.setInfoObjectLocation({something:"else"})).to.deep.equal({type:"NO_ACTION"});
        });
        it("should return NO ACTION if no GeographicLocation", () => {
            expect(mapActions.setInfoObjectLocation()).to.deep.equal({type:"NO_ACTION"});
        });
        it("should set latitude and longitude if GeographicLocation is given", () => {
            const infoObject = {
                GeographicLocation : {
                    Latitude: "1.1",
                    Longitude: "2.2"
                }
            }
            const store = mockStore();
            store.dispatch(mapActions.setInfoObjectLocation(infoObject));
            expect(store.getActions())
                .to.deep.equal([{type:"SET_INFO_OBJECT_LATITUDE", payload:"1.1"},
                                {type:"SET_INFO_OBJECT_LONGITUDE", payload:"2.2"}])
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
        });
    });
    describe("setMapLatitude", () => {
        it("should set latitude", () => {
            const latitude = "0.0";
            expect(mapActions.setMapLatitude(latitude)).to.deep.equal({type:"SET_INFO_OBJECT_LATITUDE", payload: latitude});
        });
    });
    describe("setMapLongitude", () => {
        it("should set longitude", () => {
            const longitude = "1.1";
            expect(mapActions.setMapLongitude(longitude)).to.deep.equal({type:"SET_INFO_OBJECT_LONGITUDE", payload: longitude});
        });
    });
    describe("filterATMsByUserGeoLocation", ()=> {
        it("should add error to log when geolocation is not available", () => {
            const temp = global.navigator;
            global.navigator = {};
            expect(mapActions.filterATMsByUserGeoLocation()).to.deep.equal({type:"ADD_ERROR_TO_LOG", payload:"No browser geographic location available."});
            global.navigator = temp;
        });
        it("should set user coordinates when geolocation is available", () => {
            const initialState = {};
            const store = mockStore(initialState);
            store.dispatch(mapActions.filterATMsByUserGeoLocation());
            expect(store.getActions()).to.deep.equal([ 
                { type: 'SET_USER_LATITUDE', payload: '1.1' },
                { type: 'SET_USER_LONGITUDE', payload: '2.2' } 
            ]);
        });
    });
});