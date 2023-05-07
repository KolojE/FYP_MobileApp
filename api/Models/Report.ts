import IForm from "./Form";

export interface IReport{
    _id:string;
    name:string;
    submissionDate: Date;
    updateDate:Date;
    details: object;
    status:string;
    comment?:string;
}