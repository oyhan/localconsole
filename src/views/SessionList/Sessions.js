
import React, { useState } from "react"
import CustomGrid from "components/DataGrid/Grid"
import Container from "components/Content/Container"
import { DetailRow } from '@syncfusion/ej2-react-grids';
import ReactJson from 'react-json-view'
import DataTable from "components/Grid/DataTable";
import { useConnect } from 'dotnetify';
import { SessionListModel } from "models/SessionListModel";
import './sessions.css'
import { RemoteSaveAdaptor, DataManager } from "@syncfusion/ej2-data";
import { CustomRemoteSaveAdaptor } from "components/Grid/CustomRemoteSaveAdaptor";


const Sessions = (props) => {
    const { state } = useConnect("MainViewModel", { Sessions: [] });
    const logDetails = (props) => {
        
        var json = JSON.parse(props.Data);

        return <ReactJson src={json} />
    }



    document.title = SessionListModel.Title;

    function getClassRow(status){
        switch (status) {
            case 15:
            case 14:
                return ("ok");
            case 100 :
                return ("warning")    
        
            default:
                return "critical";
                
        }
    }
    function rowDataBound(args) {
        
        if (args.row) {

            args.row.classList.add(getClassRow(args.data.Status));

          
        }
    }
    const dataSource = new DataManager({
        adaptor: new CustomRemoteSaveAdaptor,
      
        json: state.Sessions,
        
        removeUrl: `/api/data/RemoveClient`,
        updateUrl:`/api/data/updateClient`,
        batchUrl:`/api/data/RemoveClients`,
        
    });

    return (
        <Container title={SessionListModel.Title} description={""} >
            <DataTable
                gridConfig={{ rowDataBound: rowDataBound }}
                 delete  
                 edit 
                data={dataSource} columns={SessionListModel.properties} />
            {/* <CustomGrid model={SessionListModel}/> */}
        </Container>

    )
}

export default Sessions;