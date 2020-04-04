import React from "react"
import { PropType } from "./Types";
import { BaseModel } from "./BaseModel";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { UserService } from "services/UserService";
import { formExtractor } from "infrastructure/Helper/formExtracor";
import { MainService } from "services/MainService";
import { Urls } from "infrastructure/Helper/urls";



export class PersonnelModel {

    static get Title() {
        return "ثبت نام";
    }

    static get Icon() {
        return <OpenInNewIcon />;
    }

    static get properties() {

        return new Promise((resolve) => resolve([

            { Name: "Name", Type: PropType.Text, DisplayName: "نام", Required: true },
            { Name: "Family", Type: PropType.Text, DisplayName: "نام خانوادگی", Required: true },
            { Name: "Email", Type: PropType.Text, DisplayName: "ایمیل", Required: true },
            { Name: "EmailConfirmed", Type: PropType.CheckBox, DisplayName: "تایید شده", Required: false },


        ]))
    }

    static get NewProperties() {

        return MainService.Get(Urls.Personnel.GetRoles).then(response => {
            const dtSource = response.map(item =>  ({ text: item.Name, value: item.Name }));

            return [
                { Name: "Name", Type: PropType.Text, DisplayName: "نام", Required: true },
                { Name: "Family", Type: PropType.Text, DisplayName: "نام خانوادگی", Required: true },
                { Name: "Email", Type: PropType.Text, DisplayName: "ایمیل", Required: true },
                { Name: "PhoneNumber", Type: PropType.Text, DisplayName: "شماره همراه", Required: true },
                { Name: "Password", Type: PropType.Password, DisplayName: "کلمه عبور", Required: true },
                { Name: "RolesList", Type: PropType.Select, multiple: true, DisplayName: "انتخاب نقش", Required: true, DataSource: dtSource },
            ]

        })
        return new Promise((resolve) => resolve([




        ]))
    }
    static get EditProperties() {

        return MainService.Get(Urls.Personnel.GetRoles).then(response => {
            const dtSource = response.map(item =>  ({ text: item.Name, value: item.Name }));
            return [
                { Name: "Id", Type: PropType.Hidden, },
                { Name: "Name", Type: PropType.Text, DisplayName: "نام", Required: true },
                { Name: "Family", Type: PropType.Text, DisplayName: "نام خانوادگی", Required: true },
                { Name: "PhoneNumber", Type: PropType.Text, DisplayName: "شماره همراه", Required: true },
                { Name: "Email", Type: PropType.Text, DisplayName: "ایمیل", Required: true },
                { Name: "RolesList", Type: PropType.Select, multiple: true, DisplayName: "انتخاب نقش", Required: true, DataSource: dtSource },
            ]

        })
     
    }
    static list() {
        return MainService.Get(Urls.Personnel.GetAll).then((response) => {
            console.log("reponse from get all");
            console.log(response);
            return response;
        });
    }


    static handleSubmit(event) {
        event.preventDefault();
        // let { from } = this.props.location.state || { from: { pathname: "/" } };

        var postdata = formExtractor(event.target);
        return MainService.New("/api/account/RegisterPersonnel", postdata);
        //     if (postdata.userName === "ali" && postdata.passWord === '123') {
        //         console.log("ok");
        //          UserService.singin({Name:"admin",isAuthenticated :true});
        //          return Promise.resolve({ redirect: undefined, message: "عملیات  با موفقیت انجام شد" });
        //     // return PersonnelService.New(postdata)
        //     //     .then((response) => {
        //     //         console.log("response");
        //     //         console.log(response);

        //     //         // UserService.singin(response);
        //     //         return Promise.resolve({ redirect: "/", message: "عملیات  با موفقیت انجام شد" });
        //     //     }, () => Promise.reject("ok"))


        //     return Promise.resolve({ redirect: "/border", message: "عملیات  با موفقیت انجام شد" });

        //     return Promise.resolve({ message: 'admin loged in !', redirect: "/" })

        // }


        return Promise.resolve({ redirect: "/border", message: "عملیات  با موفقیت انجام نشد" });

        // return Promise.reject("error")

    }
}
