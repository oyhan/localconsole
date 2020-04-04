
import { PropType } from "./Types";



export class BaseModel{

    
    static get properties() {

        return [
            { Name: "Id", Type: PropType.Hidden  },
            { Name: "CreatedDate", Type: PropType.Hidden ,DisplayName: "ایجاد شده"  },
            { Name: "LastModifiedDate", Type: PropType.Hidden  ,DisplayName: "آخرین ویرایش" },
            // { Name: "LastModifiedBy", Type: PropType.Hidden  },
        ];
    }
}