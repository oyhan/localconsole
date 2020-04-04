export const Urls = {
    Login : "api/account/login",
    isAuthenticated : "/api/account/IsAuthenticated",
    GoogleLogin : "api/account/glogin",
    Personnel :{
        GetAll : "/api/personnel/getpersonnel",
        GetRoles : "/api/personnel/getroles",
        Edit : "/api/personnel/edit"
    },
    SessionList: {
        Get: "/api/segment/get/",
        GetAll: "/api/segment/getall",
        Delete: "/api/segment/delete",
        New: "/api/segment/new",
        GetModel: "/api/segment/getmodel",
        Batch: "/api/segment/bdelete",
        Edit: "/api/segment/edit",
        GetEditModel:"/api/segment/getmodel?modeltype=edit"
    },
    ConsoleLog: {
        Get: "/api/ConsoleLog/get?id=",
        GetAll: "/api/data/getall",
        GetAllDetailed: "/api/data/GetAllDetailed",
        Delete: "/api/log/delete",
        New: "/api/log/new",
        GetModel: "/api/log/getmodel",
        Batch: "/api/log/bdelete",
        Edit: "/api/log/edit"
    },
    IssueType: {
        Get: "/api/IssueType/get/",
        GetAll: "/api/IssueType/getall",
        Delete: "/api/IssueType/delete",
        New: "/api/IssueType/new",
        GetModel: "/api/IssueType/getmodel",
        Batch: "/api/IssueType/bdelete",
        Edit: "/api/IssueType/edit"
    },
    Issue: {
        GetByTypeId: "/api/issue/GetByIssueTypeId/",
        Get: "/api/issue/get?id=",
        GetAll: "/api/issue/getall",
        Delete: "/api/issue/delete",
        New: "/api/issue/new",
        GetModel: "/api/issue/getmodel",
        Batch: "/api/issue/bdelete",
        Edit: "/api/issue/edit"
    },
    Content: {
        Upload: "/api/content/upload",
        GetAll: "/api/customer/getall",
        Delete: "/api/customer/delete",
        New: "/api/customer/new",
        GetModel: "/api/customer/getmodel",
        Batch: "/api/customer/bdelete",
        Edit: "/api/customer/edit",
        Clients : "/api/customer/getclients/"
    },
    CustomerOrderItem: {
        Get: "/api/customerOrderItem/get?id=",
        GetAll: "/api/customerOrderItem/getall",
        Delete: "/api/customerOrderItem/delete",
        New: "/api/customerOrderItem/new",
        GetModel: "/api/customerOrderItem/getmodel",
        Batch: "/api/customerOrderItem/bdelete",
        Edit: "/api/customerOrderItem/edit"
    },
    CustomerOrder: {
        Get: "/api/customerOrder/get?id=",
        GetAll: "/api/customerOrder/getall",
        Delete: "/api/customerOrder/delete",
        New: "/api/customerOrder/new",
        GetModel: "/api/customerOrder/getmodel",
        Batch: "/api/customerOrder/bdelete",
        Edit: "/api/customerOrder/edit"
    },
    Product: {
        Get: "/api/product/get?id=",
        GetAll: "/api/product/getall",
        Delete: "/api/product/delete",
        New: "/api/product/new",
        GetModel: "/api/product/getmodel",
        Batch: "/api/product/bdelete",
        Edit: "/api/product/edit"
    },
}