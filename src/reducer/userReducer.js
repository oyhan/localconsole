import * as actions from "actions/userActions";
import { UserService } from "services/UserService";


export const userReducer = (state, action) => {
    console.log('state: ', state);


    var user = "";
    switch (action.type) {
        case actions.LOGIN:
             user = action.user;
            UserService.singin(user);
            return user;


        case actions.LOGOFF:

            user = UserService.Logout();
            return user;


        case actions.ISAUTHENTICATED:

             user = UserService.Get();
            user.isAuthenticated = action.isAuthenticated;
            return user;

        default:
            return state;
            break;
    }

}