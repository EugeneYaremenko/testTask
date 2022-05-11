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