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
    name: string;
    submissionDate: Date;
    updateDate: Date;
    details: IDetails;
    status: {
        _id: string;
        desc: string;
        comment: string;
    };
}