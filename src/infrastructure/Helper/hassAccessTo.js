import { RoleAccess } from "security/RoleAccess";
import { ROLES } from "infrastructure/Constants/RoleConstants";

export default function hasAccessTo(path, user) {
    
    

    


    const { Roles } = user;
    
    
    // if (Roles.includes(ROLES.ADMIN)) return true;


   
    for (const role of Roles) {
        if (RoleAccess[role].some(r=>r.toLowerCase() == path.toLowerCase())) {
            
            return true;
        }
    }
    
    return false;

}