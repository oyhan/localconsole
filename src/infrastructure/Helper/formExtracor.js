import { ConfirmationNumberOutlined } from "@material-ui/icons";

export const formObject = (target) => {


    const formData = new FormData(target);
    

    var json = {};
    for (let entry of formData.entries()) {


        if (entry[0].indexOf("List") != -1) {
            var list = entry[1].split(",");
            
            if (list.length == 1 && list[0]=="") {

                

                continue;
                

            }
            
            json[entry[0]] = list;
        }
        else
            json[entry[0]] = entry[1]
    }
    return json;
}

export const formExtractor = (target) => {



    return JSON.stringify(formObject(target));
}

