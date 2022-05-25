export interface IUserRegistrationError {
    data: {
        success: boolean,
        message: string,
        fails?: {
            count: Array<string>,
            page: Array<string>,
        }
    },
    status: number,
}

export interface IUserPositionsError {
    success: boolean,
    message: string,
}