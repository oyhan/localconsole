import React, { useEffect } from "react"
import { Query } from "@syncfusion/ej2-data";
import { DropDownListComponent, dropDownBaseClasses } from "@syncfusion/ej2-react-dropdowns";
import GridItem from "components/Grid/GridItem";



const CustomDropDownList = (props) => {


    var dorpDown = null;
    const onFiltering = (e) => {
        let query = new Query();

        //frame the query based on search string with filter type.
        query = (e.text !== '') ? query.where('text', 'contains', e.text, true) : query;
        //pass the filter data source, filter query to updateData method. 
        e.updateData(props.dataSource, query);
    };

    useEffect(()=>{
        
    },[]);

    return (
            <DropDownListComponent    width={150} ref={d=> dorpDown=d } {...props}
                // filtering={onFiltering}
            />

    )

}
export default CustomDropDownList;