import { UrlFieldFormatType } from "@pnp/sp/fields/types";

export interface IADRAStaff {

    Id: number;
    ADRAOffice: {
        Description: string;
        Url: string;
    };
    FirstName: string; 
    LastName: string;
    JobTitle: string; 
    BusinessPhone: string;
    EmailAddress: string;
    SkypeID: string;
    Company:string;
}
