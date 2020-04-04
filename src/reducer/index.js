import { userReducer } from "./userReducer";
import resourceReducer from "./resourceReducer";




const mainReducer = ({ user , resource }, action) => {
  
    // middleware goes here, i.e calling analytics service, etc.
    return {
      user: userReducer(user, action),
      resource : resourceReducer(resource,action)
    };
  };

  export default mainReducer;