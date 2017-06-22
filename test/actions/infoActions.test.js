import * as infoActions from "../../public/js/actions/infoActions.js";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe("Info Actions", () => {
    describe("setInfoIndex", () => {
        it("should set info ID", () => {
            const id = 1;
            const expectedAction = {
                type:"SET_INFO_ID",
                payload: id
            }
            expect(infoActions.setInfoIndex(id)).to.deep.equal(expectedAction);
        });
    });
    describe("setInfoObjects", ()=> {
        it("should set info objects", () => {
            const infoObjects = [{key:"Something", value:"else"}];
            const expectedAction = {
                type:"SET_INFO_OBJECTS",
                payload: infoObjects
            };
            expect(infoActions.setInfoObjects(infoObjects)).to.deep.equal(expectedAction);
        })
    })
});