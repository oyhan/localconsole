import { RemoteSaveAdaptor, UrlAdaptor, JsonAdaptor, Adaptor, DataUtil } from "@syncfusion/ej2-data";
import { extend } from "@syncfusion/ej2-react-grids";


export class CustomRemoteSaveAdaptor extends RemoteSaveAdaptor {
  
    remove(dm, keyField, value, tableName, query){
    
       
        return {
            type: 'POST',
            url: dm.dataSource.removeUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify(value)
        };
    }

   update(dm, keyField, value, tableName, query){
    return {
        type: 'POST',
        url: dm.dataSource.updateUrl || dm.dataSource.crudUrl || dm.dataSource.url,
        data: JSON.stringify(value)
    };
   }

  
}