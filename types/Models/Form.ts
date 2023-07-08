
export enum inputType {
    Text = "Text",
    Date = "Date",
    Time = "Time",
    DropDown = "DropDown",
    Map = "Map",
    Photo = "Photo",
    Video = "Video"
}


export interface IField{
    _id?:string,
    label: string,
    inputType: inputType,
    options?: Array<any>,
    required: boolean
}


export default interface IForm {
    _id?:string;
    color: string;
    icon?: string;
    name: string;
    defaultFields?:Array<IField>;
    fields: Array<IField>;
    activation_Status: boolean;
    creationDate?:Date;

}