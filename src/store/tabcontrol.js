import React from "react";
import useGlobalHook from "use-global-hook";

const goEdit =(store)=>{
    store.setState(1);
}


const goList =(store)=>{
    store.setState(0);
}
const setValue =(store , value )=>{
    
    
    store.setState({value});
    

}

const useTab = useGlobalHook(React, {value:0} , {goEdit,goList,setValue});


export default useTab;