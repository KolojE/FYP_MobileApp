import IUser from "./User";




export default interface IComplainant extends IUser {
    compID: string;
    activation:boolean
}