// export enum UserPositions {
//     FRONTEND_DEVELOPER = "Frontend developer",
//     BACKEND_DEVELOPER = "Backend developer",
//     DESIGNER = "Designer",
//     QA = "QA",
// }

export enum UserPositions {
    LAWYER = "Lawyer",
    CONTENT_MANAGER = "Content manager",
    SECURITY = "Security",
    DESIGNER = "Designer",
}


export interface IInitialInputValues {
    name: string,
    email: string,
    phone: string,
    position: null | UserPositions,
    position_id: number | null,
    photo: string,
}