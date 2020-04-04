import React from 'react'
import { GridComponent, ColumnsDirective, Print, ColumnDirective, Filter, Inject, VirtualScroll, Sort, Page, Toolbar, Search, Group, ExcelExport, PdfExport, Edit, DetailRow, ForeignKey, SearchSettings, Resize } from '@syncfusion/ej2-react-grids';
import { DataManager, UrlAdaptor, WebApiAdaptor, JsonAdaptor, ODataAdaptor, RemoteSaveAdaptor, WebMethodAdaptor } from '@syncfusion/ej2-data';
import { ShowSnack } from 'infrastructure/Helper/Showsnack';
import 'infrastructure/Helper/localization';



export default function DataTable({ columns, data, addCol, childGrid, gridConfig, columnTemplate, ...props }) {
    const toolbarOptions = ['Search', 'ExcelExport', 'Print', 'Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const [grid, setGrid] = React.useState({});
    const editOptions = { allowEditing: props.edit && true, allowAdding: false, allowDeleting: props.delete && true, showDeleteConfirmDialog: true, mode: props.dialogTemplate ? 'Dialog' : 'Normal', template: props.dialogTemplate };
    function actionFailure(arg) {
        console.log('arg: ', arg);
        try {

            var json = JSON.parse(arg.error[0].error.response);
            console.log('json: ', json);
            var errorMessage = "";
            for (var prop in json)
                errorMessage += json[prop];
            ShowSnack.Error(errorMessage)
            //cancel the edit operation
            grid.refresh();
        } catch (error) {
            console.log( error);
            arg && ShowSnack.Error(arg.error[0].error.response);

            // ShowSnack.Error(arg.response)
            // grid.refresh();
            // 
        }



    }




    function actionBegin(arg) {

        if (arg.action == 'add' && arg.requestType == 'save' && !arg.cancel) {
            arg.cancel = true;
            grid.addRecord(arg.data);
            //    grid.endEdit();
        }
    }

    function actionCompleted(arg) {
        // grid.showSpinner();

        // grid.refresh();
        if (arg.requestType == 'delete') {
            grid.refresh()
        }
    }

    function toolbarClick(args) {
        console.log('args: ', args);
        switch (args.item.text) {
            case 'PDF Export':
                grid.pdfExport();
                break;
            case 'Excel Export':
            case "خروجی اکسل":
                grid.excelExport();
                break;
            case 'CSV Export':
                grid.csvExport();
                break;
            case 'Print':
                grid.print();
                break;
            case 'افزودن':

                return false;
                break;

            default:

        }
    }

    return (

        <GridComponent
            enableRtl
            allowSorting={true}


            {...gridConfig}
            actionBegin={actionBegin}
            actionFailure={actionFailure.bind(this)}
            actionComplete={actionCompleted}
            allowGrouping={true}
            editSettings={editOptions}
            ref={g => {
                setGrid(g);

            }}
            toolbarClick={toolbarClick}
            // allowFiltering={true}
            allowExcelExport={true}
            allowPdfExport={true}
            allowCvsExport={true}
            // allowTextWrap={true}
            // allowFiltering={true}
            dataSource={data}
            toolbar={toolbarOptions}
            allowPaging={true}
            pageSettings={{ pageSize: 15, pageCount: 5, pageSizes: true }}
            childGrid={childGrid}
            locale="fa-IR"
            allowResizing
        >

            <ColumnsDirective>

                <ColumnDirective key="check" type='checkbox' width='60'></ColumnDirective>

                {
                    columns.map(

                        c => {
                            if (c.Name == 'Id') return (
                                <ColumnDirective key={c.Name} field={c.Name} visible={false} headerText='Id' isPrimaryKey={true} width='130'></ColumnDirective>

                            )

                            if (c.IsForeignKey) {

                                return (<ColumnDirective field={c.Name} headerText={c.DisplayName == null ? c.Name : c.DisplayName} foreignKeyValue='Name' foreignKeyField="Id"
                                    dataSource={new DataManager(c.DataSource)} width='150' />)

                            }

                            if (c.Name == 'CreatedDate' || c.Name == 'LastModifiedDate') return (
                                <ColumnDirective key={c.Name} field={c.Name} allowEditing={false} headerText={c.DisplayName == null ? c.Name : c.DisplayName} width='150'></ColumnDirective>

                            )

                            return (<ColumnDirective key={c.Name} field={c.Name} isPrimaryKey ={c.primaryKey}

                                template={columnTemplate && c.Name == columnTemplate.columnName ? columnTemplate.template : ""}

                                headerText={c.DisplayName} width={c.width || '150'}></ColumnDirective>)

                        }


                    )
                }

                {
                    addCol && addCol.map(col => {

                        return col;

                    }

                    )

                }
            </ColumnsDirective>
            <Inject services={[Resize ,ForeignKey, DetailRow, Toolbar, Search, Sort, ExcelExport, PdfExport, Edit, Page, Group, Filter]} />
        </GridComponent>
    )
}