export default interface IOrganization {
    _id: string;
    ID: string;
    name: string;
    contactNo: string;
    address: string;
    creationDate: Date;
    system:{
        autoActiveNewUser: boolean;
        defaultStatus: string;
    }
}


