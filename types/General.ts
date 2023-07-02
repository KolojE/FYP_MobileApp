import IOrganization from "./Models/Organization"
import { IReport } from "./Models/Report"
import { IStatus } from "./Models/Status"
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
    organizationAdmins: IUser[],
    statuses: IStatus[],
    totalReportCount: number,
    totalResolvedCount: number,
}

export type NominatimResult = {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    display_name: string;
    address: {
      house_number?: string;
      road?: string;
      suburb?: string;
      city?: string;
      county?: string;
      state?: string;
      postcode?: string;
      country?: string;
      country_code?: string;
    };
    boundingbox: string[];

  }


export type ReportGroupedByStateAndCity = {
    [state: string]: {
        [city: string]: ReportGroupedByType[]
    }
} 

export type onMessageReceiveCallback = ({ senderID, message,forwardedReport }) => void

export type sendMessageArgs = {
    receiverID: string,
    forwardedReport?: IReport,
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


export type updateProfileArgs = {
    name?: string,
    address?: string,
    contact?: {
        phoneNo?: string,
        address?: string
    },
    password?: string,
}


export type updateOrganizaitonInfoArgs = {
    organization:IOrganization,
    statuses:IStatus[],
    statusesToDelete:IStatus[],
}