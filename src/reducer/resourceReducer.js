import * as actions from "actions/resourceActions";
import * as Resource from "Resources"

const resourceReducer = (state, action) => {

    if (Resource[action.type])
        return Resource[action.type];
    return state;

}
export default resourceReducer;