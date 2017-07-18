import BranchContainer from "../../public/js/containers/BranchContainer";
import BranchWindow from "../../public/js/components/BranchWindow";
// Setting up Mock Store
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("BranchContainer", () => {
    describe("renders", () => {
        it("a BranchWindow", () => {
            const initialState = {};
            const store = mockStore(initialState);
            const wrapper = shallow(
                <BranchContainer store={store} />
            ).shallow();
            expect(wrapper.find("BranchWindow")).to.have.length(1);
        });
    });


    describe("BranchWindow", () => {
        describe("renders", () => {
            it("a div", () => {
                const wrapper = shallow(
                    <BranchWindow />
                )
                expect(wrapper.find("div")).to.have.length(1);
            });
        });
    });
});