import React from "react";
import { DataManager, RemoteSaveAdaptor } from "@syncfusion/ej2-data";
import { setValue } from "@syncfusion/ej2-base";
import { ShowSnack } from '../Helper/Showsnack';
import CustomDropDownList from "components/Dropdown/Dropdownlist";

var  dropDownList = function()  {

    return <CustomDropDownList dataSource={this.DataSource}
    fields={{ text: 'Name', value: 'Id' }}
    allowFiltering={true}
    placeholder={this.DisplayName}
    locale="fa-IR"
    name={this.Name}
    // reference={d => this.customer = d}
    />;

}

export default (model) => {


    var grid = {
        dataSource: [],
        columns: [],
        load() {
            const str = 'Id';
            (this).parentDetails.parentKeyFieldValue =
                (this).parentDetails.parentRowData[str];
        },
        queryString: model.ForeignKey,
        editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
        toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
        locale: "fa-IR",
        actionBegin(args) {
            if (args.requestType === "add" || args.requestType === "update") {
                /** parentKeyFieldValue refers to the queryString field value of the parent record. */
                setValue(model.ForeignKey, (this).parentDetails.parentKeyFieldValue, (args.data));
            }
        },
        actionFailure(arg) {

            try {
                console.log('arg: ', arg);
                var json = JSON.parse(arg[0].error.response);
                var errorMessage = "";
                for (var prop in json)
                    errorMessage += json[prop];
                ShowSnack.Error(errorMessage)
                //cancel the edit operation
                // this.refresh();
            } catch (error) {
                arg[0] && ShowSnack.Error(arg[0].error.response);

                // this.refresh();
            }



        }
    };

    return model.properties.then(response => {
        response.map(c => {
            if (c.Name == "Id") {
                grid.columns.push({
                    key: c.Name, field: c.Name, visible: false, isPrimaryKey: true
                })
            } else
                if (c.Name.includes("Id") && c.Name.length > 2) {
                    console.log('c: ', c);

                    grid.columns.push({
                        field: c.Name, foreignKeyValue: "Name", foreignKeyField: "Id", headerText: c.DisplayName, textAlign: 'Right',
                        width: 200, dataSource: new DataManager(c.DataSource),
                        // edit: { params: { allowFiltering: true } }
                        editTemplate : dropDownList.bind(c)
                    })
                } else
                    grid.columns.push({
                        field: c.Name, headerText: c.DisplayName, textAlign: 'Right', width: 130
                    })

        })


    }).then(model.list().then(response => {

        grid.dataSource = new DataManager(

            {

                adaptor: new RemoteSaveAdaptor(),
                updateUrl: model.EditUrl,
                removeUrl: model.DeleteUrl,
                insertUrl: model.InsertUrl,
                batchUrl: model.BatchUrl,
                json: response
            }
        )
    })).then(response => {
        console.log('grid: ', grid);
        return grid;


    })


}