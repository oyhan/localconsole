import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from "store/appState";
import hasAccessTo from "./Helper/hassAccessTo";
import { UserService } from "services/UserService";
import { ISAUTHENTICATED } from "actions/userActions";
export const PrivateRoute = ({ component: Component, userRole: string, render, path, ...rest }) => {
    
    

    const [{ user }, dispatch] = useStateValue();
    
    
    useEffect(() => {
        UserService.IsAuthenticated().then(result => {
            
            dispatch({
                type: ISAUTHENTICATED,
                isAuthenticated: result
            })
        })
    },[])
    return (

        <Route {...rest}
            render={(props) => (
                user.isAuthenticated && hasAccessTo(path, user) ?

                    <Component {...props} />
                    : <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }} />
            )} />


    )
}