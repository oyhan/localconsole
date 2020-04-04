import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Filter, Inject, Sort, Page, Toolbar, Search, Group, ExcelExport, PdfExport, Edit, DetailRow, ForeignKey } from '@syncfusion/ej2-react-grids';
// import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
//import "@syncfusion/ej2-base/styles/material.css";
import { ShowSnack } from 'infrastructure/Helper/Showsnack';
import modelToGrid from 'infrastructure/Helper/modelToGrid';
import ErrorBoundary from 'components/ErrorBoundry/ErrorBoundry';
import { PropType } from 'models/Types';
import { authentication } from 'services/UserService';
import '../../infrastructure/Helper/localization';




export default class CustomGrid extends React.Component {

    constructor(props, state) {

        super(props, state);
        this.gridConfig = props.gridConfig;

        this.columnTemplate = props.columnTemplate;
        this.addCol = props.addCol;
        this.services = this.props.gridService == undefined ? [] : this.props.gridService
        this.toolbarClick = this.toolbarClick.bind(this);
        this.actionBegin = this.actionBegin.bind(this);
        this.actionCompleted = this.actionCompleted.bind(this);
        this.model = this.props.model;

        this.datas = null;
        this.state = {
            data: [], columns: []
        };





        this.data =
            new DataManager(
                {
                    offline: this.props.offline

                });

    }


    // dialogTemplate(props) {
    //      // this is undefined


    //     return <GenericForm model={this.model} />
    // }

    toolbarOptions = ['Search', 'ExcelExport', 'Print', 'Add', 'Edit', 'Delete', 'Update', 'Cancel'];

    editOptions = { allowEditing: this.props.edit && true, allowAdding: false, allowDeleting: this.props.delete && true, showDeleteConfirmDialog: true, mode: this.props.dialogTemplate || this.props.dialogEdit ? 'Dialog' :'Normal', template: this.props.dialogTemplate };

    actionFailure(arg) {
        try {

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
            // 
        }



    }
    actionBegin(arg) {

        // if (arg.action == 'add' && arg.requestType == 'save' && !arg.cancel) {
        //     arg.cancel = true;
        //     this.grid.addRecord(arg.data);
        //     //    this.grid.endEdit();
        // }

        // if(arg.requestType == 'save' && arg.form ){
        //    this.props.editAction(arg.form);
        // }

    }

    actionCompleted(arg) {
        // // this.grid.showSpinner();

        // // this.grid.refresh();
        // if (arg.requestType == 'delete') {
        //     this.grid.refresh()
        // }
    }

    toolbarClick(args) {
        switch (args.item.text) {
            case 'PDF Export':
                this.grid.pdfExport();
                break;
            case 'Excel Export':
                this.grid.excelExport();
                break;
            case 'CSV Export':
                this.grid.csvExport();
                break;
            case 'Print':
                this.grid.print();
                break;
            case 'افزودن':

                return false;
                break;

            default:

        }
    }

    componentDidMount() {
        this.props.childModel && modelToGrid(this.props.childModel).then(result => {
            this.setState({ childGrid: result });


        })
        this.props.columns && this.setState({columns:this.props.columns});

        !this.props.offline && this.props.model.list().then(response => {
            
            this.setState({ data: response });
            this.grid.dataSource = new DataManager(
                {
                    // url: this.hostUrl + 'api/Orders',q

                    // url: this.props.model.ListUrl,
                    adaptor: new RemoteSaveAdaptor(),
                    // url : "api/product",
                    updateUrl: this.props.model.EditUrl,
                    removeUrl: this.props.model.DeleteUrl,
                    batchUrl: this.props.model.BatchUrl,
                    // batchUrl : this.props.model.BatchUrl,
                    // offline: true,
                    json: this.state.data,
                    headers :[{...authentication()}],



                });

            //fixes the checkbox at editing state
            this.grid.refreshColumns();
        }, error => {
            
            ShowSnack.Error(error);
        }
        );
       !this.props.columns && this.props.model.properties.then(props => {
            
            
            
            this.setState({ columns: props })
            this.grid.refreshColumns();
            this.grid.showSpinner();

        }, error => {

            
            ShowSnack.Error(error);
        }


        )
    }


    render() {
        // this.grid.showSpinner();
        
        
        return <ErrorBoundary>
            <GridComponent allowSorting={true}
                recordDoubleClick={this.props.onDoubleClick}
                {...this.gridConfig}
                // actionBegin={this.actionBegin}
                //actionFailure={this.actionFailure.bind(this)}
                //actionComplete={this.actionCompleted}
                allowGrouping={true}
                editSettings={this.editOptions}
                ref={g => {
                    this.grid = g
                    
                }}
                toolbarClick={this.toolbarClick}
                // allowFiltering={true}
                allowExcelExport={true}
                allowPdfExport={true}
                allowCvsExport={true}
                locale="fa-IR"
                // allowTextWrap={true}
                // allowFiltering={true}
                dataSource={this.data} toolbar={this.toolbarOptions}
                allowPaging={true} pageSettings={{ pageSize: 15, pageCount: 5, pageSizes: true }}
                childGrid={this.state.childGrid}
            >

                <ColumnsDirective>

                    <ColumnDirective key="check" type='checkbox' width='20'></ColumnDirective>

                    {
                        this.state.columns.map(

                            c => {
                                if (c.Name == 'Id') return (
                                    <ColumnDirective key={c.Name} field={c.Name} visible={false} headerText='Id' isPrimaryKey={true} width='20%'></ColumnDirective>

                                )
                                if  (c.Type == PropType.Hidden) return "";
                                if (c.IsForeignKey) {

                                    return (<ColumnDirective key={c.Name} field={c.Name} headerText={c.DisplayName == null ? c.Name : c.DisplayName} foreignKeyValue='text' foreignKeyField="value"
                                        dataSource={new DataManager(c.DataSource)} width='20%' />)

                                }

                                if (c.Name == 'CreatedDate' || c.Name == 'LastModifiedDate') return (
                                    <ColumnDirective key={c.Name} field={c.Name} allowEditing={false} headerText={c.DisplayName == null ? c.Name : c.DisplayName} width='20%'></ColumnDirective>

                                )
                               
                                return (<ColumnDirective key={c.Name} field={c.Name} 
                                    
                                    template={this.columnTemplate && c.Name == this.columnTemplate.columnName ? this.columnTemplate.template : ""} 
                                    type={c.Type ==PropType.CheckBox ? 'checkbox' : 'string'}
                                    headerText={c.DisplayName} width='20%'></ColumnDirective>)

                            }


                        )
                    }

                    {
                        this.addCol && this.addCol.map(col => {
                            
                            return col;

                        }

                        )

                    }
                </ColumnsDirective>
                <Inject services={[ForeignKey, DetailRow, Toolbar, Search, Sort, ExcelExport, PdfExport, Edit, Page, Group, Filter, ...this.services]} />
            </GridComponent>
        </ErrorBoundary>

    }

}