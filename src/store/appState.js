import React, {createContext, useContext, useReducer} from 'react';
import { UserService } from 'services/UserService';
import { DEFAULT } from 'Resources/Resources';

export const StateContext = createContext();
export const StateProvider = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);



export const initialState = {
    user:  UserService.isAuthenticated ? UserService.Get() : {isAuthenticated : false , AccessToken : "" , Name : "" , Roles :[],ExpireDate :""} ,
    resource : DEFAULT
}