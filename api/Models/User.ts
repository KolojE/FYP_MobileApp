import IOrganization from "./Organization"
export enum roles  {
    admin= "admin",
    complainant = "complainant",
}

export default interface IUser {
    _id:string,
    ID:string,
    name:string,
    email:string,
    organization:IOrganization,
    contact:{
        phoneNo:string,
        address:string
    }
    role:roles,
}


