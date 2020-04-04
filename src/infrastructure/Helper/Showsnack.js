import React from "react"
import { withSnackbar } from "notistack";


    let Success;
    let Warning;
    let Error;
    let Info;

 class  Notifier extends React.Component {

    componentDidMount(){
        Success = this.showSuccess;
        Warning = this.showWarning;
        Error = this.showError;
        Info = this.showInfo;
    }
    constructor(){
        super();
        this.showMessage = this.showMessage.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.showWarning = this.showWarning.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }

        showError(message){
            this.showMessage(message,"error")
        }
        showWarning(message){
            this.showMessage(message,"warning")
        }
        showInfo(message){
            this.showMessage(message,"info")
        }
        showSuccess(message){
            this.showMessage(message,"success")
        }


        showMessage(message , variant) {
                var { enqueueSnackbar } = this.props;
                
                enqueueSnackbar(message, {variant:variant});
        }


        render(){
            return null;
        }
}

export default  withSnackbar(Notifier)


export  const ShowSnack = {

    Success : function(message){
            Success(message);
    } ,
    Error : function(message){
        Error(message)
    },
    Warning : function(message){
        Warning(message)
    },
    Info : function(message){
        Info(message);
    }


}
