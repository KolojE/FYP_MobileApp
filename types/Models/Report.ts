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
    _id: string;
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
    };
    complainant?:{
        email: string;
        _id:string;
        name:string;
    };
    form?: {
        _id: string;
        name: string;
        color: string;
        icon?: string;
        isDeleted: boolean;
    };
    comment?: {
        comment: string;
        adminID?: string;
    }
}