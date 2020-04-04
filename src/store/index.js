import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "../actions";



const initialState = {
   dialogOpen : false,
   attributes :[] ,
   formValues  : {} ,
   removedAttribute :[] 
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
