import IOrganization from "./Models/Organization"
import { IReport } from "./Models/Report"
import IUser from "./Models/User"

export type LoginCredentials = {
    identifier: string,
    password: string,
}


export type RegistrationCredentials = {
    email: string,
    password: string,
    organization: {
        ID: string,
    }
    name: string,
}

export type UserInfo = {
    user: IUser,
    organization: IOrganization,
    totalReportCount: number,
    totalResolvedCount: number,
}


export type onMessageReceiveCallback = ({ senderID, message }) => void

export type sendMessageArgs = {
    receiverID: string,
    message: string,
}

export type fieldScema= string | { La: number, Lo:number} | Date | string[]


export type reportSubmissionSchema = {
    [key: string]: fieldScema
}

export type ReportGroupedByType = {
    _id: string,//form's ID
    name: string,//form's name
    reports: IReport[],//report details
}

export type filterOptions = {
    fromDate?: Date,
    toDate: Date,
    statusIDs?: string[],
    typeIDs?: string[],
    sortBy?: "subDate" | "upDate",
}
