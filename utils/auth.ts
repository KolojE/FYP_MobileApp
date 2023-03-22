import { setUser,roles } from "./user"

export default auth = {
    authentication:async(loginDetails)=>
    {
        if(loginDetails.email_username=="admin")
        setUser(roles.admin);
        else{
            setUser(roles.complainant);
        }
    },
}