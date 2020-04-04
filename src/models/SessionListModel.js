import React from "react"
import { PropType } from "./Types";
import { BaseModel } from "./BaseModel";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Urls } from "infrastructure/Helper/urls";
import { MainService } from "services/MainService";
import ModelResources from "infrastructure/Resources/ModelResources";
import { formExtractor } from "infrastructure/Helper/formExtracor";
import AppConfiguration from "app.config";

var host = AppConfiguration.Server.Socket();

export class SessionListModel extends BaseModel {

    constructor() {
        this.NewUrl = this.NewUrl.bind(this)
    }

    static GetClients(customerId) {


        var url = host + Urls.SessionList.Clients + customerId;


        return MainService.Get(url)
    }
    static get Title() {
        return "پایش محافط داده های سازمانی رنپاد"
    }

    static get Icon() {
        return <OpenInNewIcon />;
    }

    static get ListUrl() {
        return host + Urls.SessionList.GetAll
    }
    static get DeleteUrl() {
        return host + Urls.SessionList.Delete
    }

    static get EditUrl() {
        return host + Urls.SessionList.Edit
    }
    static get NewUrl() {
        return host + Urls.SessionList.New
    }
    static get BatchUrl() {
        return host + Urls.SessionList.Batch
    }



    static list() {
        return MainService.GetAll(host + Urls.SessionList.GetModel).then((response) => {
            return response;
        });
    }
    static get properties() {




        // return new Promise((resolve) => resolve([

        //     { Name: "Number", Type: PropType.Text, DisplayName: " کلاینت", Required: true },
        //     { Name: "IsRunning", Type: PropType.Text, DisplayName: "درحال اجرا", Required: true },
        //     { Name: "Version", Type: PropType.Text, DisplayName: "نسخه", Required: true },
        //     { Name: "ServerID", Type: PropType.Text, DisplayName: "شناسه سرور", Required: true },
        //     { Name: "OrganizationId", Type: PropType.Text, DisplayName: "شناسه سازمان", Required: true },
        //     { Name: "ProtectionStatus", Type: PropType.Text, DisplayName: "وضعیت محافظت", Required: true },
        //     { Name: "LicenseExpireDate", Type: PropType.CheckBox, DisplayName: "تاریخ انقضا لایسنس", Required: false },


        // ]))



        return [

            { Name: "ServerName", Type: PropType.Text, DisplayName: "نام سرور", Required: true },
            { Name: "ClientIp", Type: PropType.Text, DisplayName: "آدرس", Required: true },
            { Name: "IsRunning", Type: PropType.Text, DisplayName: "وضعیت اجرا", Required: true },
            { Name: "Version", Type: PropType.Text, DisplayName: "نسخه", Required: true },
            { Name: "ServerID", Type: PropType.Text, DisplayName: "شناسه سرور", Required: true  , primaryKey:true},
            { Name: "OrganizationId", Type: PropType.Text, DisplayName: "شناسه سازمان", Required: true },
            { Name: "ProtectionStatus", Type: PropType.Text, DisplayName: "وضعیت محافظت", Required: true },
            { Name: "LicenseExpireDate", Type: PropType.Text, DisplayName: "تاریخ انقضا لایسنس", Required: false ,width:'200'},
            // { Name: "Status", Type: PropType.Text, DisplayName: "تاریخ انقضا لایسنس", Required: false },


        ];
    }

    static list() {
        return MainService.GetAll(this.ListUrl).then((response) => {


            return response;
        });
    }

    static get NewProperties() {

        return MainService.GetModel(host + Urls.SessionList.GetModel).
            then(props => props.filter(f => f.Name !== 'Id'));
    }
    static get EditProperties() {

        return MainService.GetModel(host + Urls.SessionList.GetEditModel);
    }
    static handleSubmit(event) {
        event.preventDefault();
        // let { from } = this.props.location.state || { from: { pathname: "/" } };

        var postdata = formExtractor(event.target);
        // postdata = JSON.parse(postdata);

        // 
        //if (postdata["Username"] === "ali" && postdata["Password"] === '123') {
        //
        //UserService.singin({Name:"admin",isAuthenticated :true});
        return MainService.New(SessionListModel.NewUrl, postdata)
            .then(() => {



                // UserService.singin(response);
                return Promise.resolve({ redirect: "/SessionList/list", message: "عملیات  با موفقیت انجام شد" });
            }, (error) => Promise.reject(error))



        return Promise.resolve({ message: 'admin SessionListed in !', redirect: "/" })

    }



    // return Promise.reject("error")

}
