import { authentication } from "./UserService";
import AppConfiguration from "../app.config";


var URL = AppConfiguration.Server.Socket();

export const MainService = {

    New,
    Get,
    GetAll,
    GetModel

}

function GetModel(url) {
    const request = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            ...authentication()
        },

    }

    return fetch(url, request).then(handleResponse, handleError)
}

// function New(url,model){
//     const request = {
//         method:"POST",
//         headers : {
//                 'Content-Type': 'application/json'
//         },
//         body : model
//     }

//     return fetch(url, request).then(handleResponse, handleError)

// }


async function New(url, model) {
    const request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...authentication()
        },
        body: model
    }

    try {
        const response = await fetch(url, request);
        
        return handleResponse(response);
    }
    catch (error) {
        return handleError(error);
    }

}

function Get(url) {
    const request = {
        method: "GET",
        headers: {
            ...authentication(),
            'Content-Type': 'application/json'
        },
    }

    return fetch(url, request).then(handleResponse, handleError);

}
function GetAll(url) {
    const request = {
        method: "GET",
        headers: {
            ...authentication(),
            'Content-Type': 'application/json'
        },
    }

    return fetch(url, request).then(handleResponse, handleError);

}


function handleResponse(response) {
    
    
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            
            if (contentType && contentType.includes("application/json")) {
                
                try {
                    
                    response.json().then(json => resolve(json));
                    
                } catch (error) {
                    
                }
            } else {
                
                resolve();
            }
        } else {
            
            // return error message from response body
            response.text().then(text => {
                
                    
                try {
                    var json = JSON.parse(text);
                    var errorMessage = "";
                    for (var prop in json)
                        errorMessage += json[prop];
                     reject(errorMessage);
                } catch (e) {
                    reject(text);

                }
            });
        }
    });
}

function handleError(error) {
    

    
    return Promise.reject(error && error.message);
}