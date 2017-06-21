import MainContainer from "../public/js/containers/MainContainer";
// Setting up Mock Store
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("MainContainer", () => {
    describe("renders", () => {
        it("MapContainer by default", () => {
            const initialState = {bankWindow:{
                activeEndPoint:"atms"
            }};
            const store = mockStore(initialState);
            const wrapper = shallow(
                <MainContainer store={store} />
            ).shallow()
            expect(wrapper.find("Connect(MapContainer)")).to.have.length(1);
        });
        it("BranchContainer when activeEndpoint is 'branches'", () => {
            const initialState = {bankWindow:{
                activeEndPoint:"branches"
            }};
            const store = mockStore(initialState);
            const wrapper = shallow(
                <MainContainer store={store} />
            ).shallow();
            expect(wrapper.find("Connect(BranchContainer)")).to.have.length(1);
        });
        it("PCAContainer when activeEndpoint is 'pca'", () => {
            const initialState = {bankWindow:{
                activeEndPoint:"pca"
            }};
            const store = mockStore(initialState);
            const wrapper = shallow(
                <MainContainer store={store} />
            ).shallow();
            expect(wrapper.find("Connect(PCAContainer)")).to.have.length(1);
        });    
    });
    describe("has property", () => {
        it("class name mainContainer", () => {
            const initialState = {bankWindow:{
                activeEndPoint:"atms"
            }};
            const store = mockStore(initialState);
            const wrapper = shallow(
                <MainContainer store={store} />
            ).shallow()
            expect(wrapper.hasClass("mainContainer")).to.equal(true);
        });
    });
});
