
export enum inputType {
    Text = "Text",
    Date = "Date",
    Time = "Time",
    DropDown = "DropDown",
    Map = "Map",
    Photo = "Photo",
}


export interface IField{
    label: string,
    inputType: inputType,
    options?: Array<any>,
    required: boolean
}


export default interface IForm {
    _id?:string;
    name: string;
    defaultFields?:Array<IField>;
    fields: Array<IField>;
    activation_Status: boolean;
    creationDate?:Date;

}