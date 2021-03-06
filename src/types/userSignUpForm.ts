// export enum UserPositions {
//     FRONTEND_DEVELOPER = "Frontend developer",
//     BACKEND_DEVELOPER = "Backend developer",
//     DESIGNER = "Designer",
//     QA = "QA",
// }

// export enum UserPositions {
//     LAWYER = "Lawyer",
//     CONTENT_MANAGER = "Content manager",
//     SECURITY = "Security",
//     DESIGNER = "Designer",
// }

export interface IUploadPhotoFile {
    lastModified: number,
    lastModifiedDate: Date,
    name: string,
    size: number,
    type: string,
    webkitRelativePath: string,
}


export interface IInitialInputValues {
    name: string,
    email: string,
    phone: string,
    position: string,
    position_id: number,
    photo: null | Blob | any,
}