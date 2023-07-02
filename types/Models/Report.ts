import { inputType } from "./Form";

export interface IDetail
{
        value: any;
        label: string;
        inputType: inputType;
}
export interface IDetails {
    [key: string]: IDetail
 };

export interface IReport {
    form_id?: any;
    _id: string;
    name: string;
    location?:{
        latitude: number;
        longitude: number;
    }
    submissionDate: Date;
    updateDate: Date;
    details: IDetails;
    status: {
        _id: string;
        desc: string;
        comment: string;
    };
    complainant?:{
        email: string;
        _id:string;
        name:string;
    };
}