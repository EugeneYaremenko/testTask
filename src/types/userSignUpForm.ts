export enum UserPositions {
    FRONTEND_DEVELOPER = "Frontend developer",
    BACKEND_DEVELOPER = "Backend developer",
    DESIGNER = "Designer",
    QA = "QA",
}


export interface IInitialInputValues {
    name: string,
    email: string,
    phone: string,
    position: string,
    position_id: number | null,
    photo: string,
};