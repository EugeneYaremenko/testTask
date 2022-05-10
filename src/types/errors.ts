export interface IUserError {
    success: boolean,
    message: string,
    fails: {
        count: Array<string>,
        page: Array<string>,
    }
}