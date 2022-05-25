export const validatePhoto = (photo: File) => {
    const maxPhotoWidth = 70;
    const maxPhotoHeight = 70;

    const img = new Image();

    img.src = window.URL.createObjectURL(photo);
    return img.decode().then(() => {
        URL.revokeObjectURL(img.src);

        const result = !(img.width > maxPhotoWidth || img.height > maxPhotoHeight);

        return result;
    })
}