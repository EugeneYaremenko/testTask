import {IUploadPhotoFile} from "./userSignUpForm";

export interface IUser {
    id: string,
    name: string,
    email: string,
    phone: string,
    position: string,
    position_id: string,
    registration_timestamp: number,
    photo: string,
}

export interface IUserPosition {
    id: string,
    name: string,
}

export interface IUserFetchResponse {
    count: number,
    links: {
        next_url: string,
        prev_url: string,
    },
    page: number,
    success: boolean,
    total_pages: number,
    total_users: number,
    users: IUser[],
}

export interface IUsersPositionsResponse {
    success: boolean,
    positions: IUserPosition[],
}

export interface IUserRegistrationRequest {
    name: string,
    email: string,
    phone: string,
    position_id: number | string,
    photo: null | IUploadPhotoFile | any
}

export interface IUserRegistrationResponse {
    success: boolean,
    user_id: number,
    message: string,
}