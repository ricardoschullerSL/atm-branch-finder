import PCAContainer from "../public/js/containers/PCAContainer";
import PCAWindow from "../public/js/components/PCAWindow";
import {BANKDATA} from "../public/js/staticdata/bankData.js"; 
// Setting up Mock Store
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("PCAContainer", () => {
    describe("renders", () => {
        it("a PCAWindow", () => {
            const initialState = {bankWindow: {
                banks: BANKDATA,
                activeBankId: 0
            }
            }
            const store = mockStore(initialState);
            const wrapper = shallow(
                <PCAContainer store={store} />
            ).shallow()
            expect(wrapper.find("PCAWindow")).to.have.length(1);
        });
    });
});
describe("PCAWindow", () => {
    describe("renders", () => {
        it("a pcaList when available", () => {
            const testBank = [{ 
                pca: [
                    {id:"testPCA"}
                ]
            }];
            const wrapper = shallow(<PCAWindow banks={testBank} activeBankId={0}/>)
            expect(wrapper.find(".pcaList")).to.have.length(1);
        });
    });
    describe("has property", () => {
        it("className 'pcaWindow'", () => {
            const testBank = [{ 
                pca: [
                    {id:"testPCA"}
                ]
            }];
            const wrapper = shallow(<PCAWindow banks={testBank} activeBankId={0} />)
            expect(wrapper.hasClass('pcaWindow')).to.equal(true);
        });
    });
});