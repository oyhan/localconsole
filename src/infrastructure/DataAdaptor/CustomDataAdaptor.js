import { DataManager, RemoteSaveAdaptor , DataUtil  } from '@syncfusion/ej2-data';
import { merge, extend, isNullOrUndefined, setValue, getValue } from '@syncfusion/ej2-base';
import { authentication } from 'services/UserService';


export class CustomDataAdaptor extends RemoteSaveAdaptor {

    
    remove(dm, keyField, val, tableName, query){
       
        return {
            type: 'POST',
            url: dm.dataSource.removeUrl || dm.dataSource.crudUrl || dm.dataSource.url,
            data: JSON.stringify(extend({}, {
                key: val,
                keyColumn: keyField,
                table: tableName,
                action: 'remove'
            }, DataUtil.getAddParams(this, dm, query))),
            headers : {
                ...authentication()
            }

        };
    }
}