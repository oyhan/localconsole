import * as React from 'react';
import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, Print, ColumnDirective, Filter, Inject, VirtualScroll, Sort, Page, Toolbar, Search, Group, ExcelExport, PdfExport, Edit, DetailRow, ForeignKey } from '@syncfusion/ej2-react-grids';
// import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, UrlAdaptor, WebApiAdaptor, JsonAdaptor, ODataAdaptor, RemoteSaveAdaptor, WebMethodAdaptor } from '@syncfusion/ej2-data';
import "@syncfusion/ej2-base/styles/material.css";
import AppConfiguration from '../../app.config';
import { ShowSnack } from '../Helper/Showsnack';
import GenericForm from './GenericForm';
import modelToGrid from '../Helper/modelToGrid';




export default class List extends React.Component {

    constructor(props, state) {
        super(props, state);
        this.model = this.props.model;
        console.log('model: ', this.model);
        this.datas = null;
        this.state = {
            data: [], columns: []
        };
        
        !this.props.offline && props.model.list().then(response => {
            this.setState({ data: response });
            this.grid.dataSource = new DataManager(
                {
                    // url: this.hostUrl + 'api/Orders',q

                    // url: this.props.model.ListUrl,
                    adaptor: new WebMethodAdaptor(),
                    url : "api/product",
                    //updateUrl: this.props.model.EditUrl,
                    //removeUrl: this.props.model.DeleteUrl,
                    //batchUrl: this.props.model.BatchUrl,
                    //// batchUrl : this.props.model.BatchUrl,
                    //// offline: true,
                    //json: this.state.data
                    //  [
                    //     { Id: "de0edd95-bd52-4900-2a0f-08d6b7f0611f", Name: "asdasd", LastModifiedDate: "7 روز پیش", CreatedDate: "7 روز پیش" },
                    //     { Id: "b8570c1c-a9ce-423d-bdcd-08d6b85093c8", Name: "مرز جدید ", LastModifiedDate: "6 روز پیش", CreatedDate: "6 روز پیش" },
                    //     { Id: "209f3152-8b19-4a58-bdce-08d6b85093c8", Name: "مقدارasdasd", LastModifiedDate: "6 روز پیش", CreatedDate: "6 روز پیش" },
                    //     { Id: "54061924-b217-4846-bdcf-08d6b85093c8", Name: "مقدارasdasdasdasdadsasd", LastModifiedDate: "6 روز پیش", CreatedDate: "6 روز پیش" },
                    //     { Id: "119ba8d0-1947-4ae6-bdd0-08d6b85093c8", Name: "مقدارqw", LastModifiedDate: "6 روز پیش", CreatedDate: "6 روز پیش" },
                    // ]

                });

            //fixes the checkbox at editing state
            this.grid.refreshColumns();
        }, error => {
            ShowSnack.Error(error);
        }
        );

        props.model.properties.then(props => {
            console.log('columns: ', props);
            this.setState({ columns: props })
            this.grid.refreshColumns();
            this.grid.showSpinner();

        });
        this.toolbarClick = this.toolbarClick.bind(this);
        this.actionBegin = this.actionBegin.bind(this);
        this.actionCompleted = this.actionCompleted.bind(this);
        this.dialogTemplate = this.dialogTemplate.bind(this);
        this.data =
            new DataManager(
                {
                    offline: this.props.offline

                });

    }


    dialogTemplate(props) {
        console.log(this); // this is undefined


        return <GenericForm model={this.model} />
    }

    toolbarOptions = ['Search', 'ExcelExport', 'Print', 'Add', 'Edit', 'Delete', 'Update', 'Cancel'];

    editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, };

    actionFailure(arg) {
        try {
            console.log('"action failure": ', arg);
            var json = JSON.parse(arg[0].error.response);
            var errorMessage = "";
            for (var prop in json)
                errorMessage += json[prop];
            ShowSnack.Error(errorMessage)
            //cancel the edit operation
            this.grid.refresh();
        } catch (error) {
            arg[0] && ShowSnack.Error(arg[0].error.response);

            ShowSnack.Error(arg.response)
            this.grid.refresh();
            // console.log('this.grid: ', this.grid);
        }



    }
    actionBegin(arg) {
        console.log('arg: ', arg);
       if (arg.action =='add' && arg.requestType == 'save' && !arg.cancel){
           arg.cancel = true;
           this.grid.addRecord(arg.data); 
        //    this.grid.endEdit();
       }
    }

    actionCompleted(arg) {
        // this.grid.showSpinner();
        console.log(arg);
        // this.grid.refresh();
        if (arg.requestType == 'delete') {
            this.grid.refresh()
        }
    }

    toolbarClick(args) {
        switch (args.item.text) {
            case 'PDF Export':
                this.grid.pdfExport();
                break;
            case 'خروجی اکسل':
                this.grid.excelExport();
                break;
            case 'CSV Export':
                this.grid.csvExport();
                break;
            case 'Print':
                this.grid.print();
                break;
            case 'افزودن':
                console.log(args);
                return false;
                break;

            default:
                console.log(args.item);
        }
    }

    componentDidMount() {
        this.props.childModel && modelToGrid(this.props.childModel).then(result => {
            this.setState({childGrid : result});


        })
    }


    render() {
        // this.grid.showSpinner();

        return <GridComponent allowSorting={true}
            //actionBegin={this.actionBegin}
            //actionFailure={this.actionFailure.bind(this)}
            //actionComplete={this.actionCompleted}
            allowGrouping={true}
            editSettings={this.editOptions}
            ref={g => this.grid = g}
            toolbarClick={this.toolbarClick}
            allowFiltering={true}
            allowExcelExport={true}
            allowPdfExport={true}
            allowCvsExport={true}
            locale="fa-IR"
            
            dataSource={this.data} toolbar={this.toolbarOptions}
            allowPaging={true} pageSettings={{ pageSize: 4, pageCount: 5, pageSizes: true }}
            childGrid={this.state.childGrid}
            >
                
            <ColumnsDirective>
                <ColumnDirective key="check" type='checkbox' width='60'></ColumnDirective>
                {
                    this.state.columns.map(
                        c => {
                            if (c.Name == 'Id') return (
                                <ColumnDirective key={c.Name} field={c.Name} visible={false} headerText='Id' isPrimaryKey={true} width='130'></ColumnDirective>

                            )

                            if (c.IsForeignKey) {
                                console.log('c.DataSource: ', c.DataSource);
                                return (<ColumnDirective field={c.Name} headerText={c.DisplayName} foreignKeyValue='Name' foreignKeyField="Id"
                                    dataSource={new DataManager(c.DataSource)} width='150' />)

                            }

                            if (c.Name == 'CreatedDate' || c.Name == 'LastModifiedDate') return (
                                <ColumnDirective key={c.Name} field={c.Name} allowEditing={false} headerText={c.DisplayName} width='150'></ColumnDirective>

                            )

                            return (<ColumnDirective key={c.Name} field={c.Name} headerText={c.DisplayName} width='150'></ColumnDirective>)

                        }


                    )
                }

            </ColumnsDirective>
            <Inject services={[ForeignKey,DetailRow,Toolbar, Search, Sort, ExcelExport, PdfExport, Edit, Page, Group]} />
        </GridComponent>
    }

}