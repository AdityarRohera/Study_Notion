
import { v2 as cloudinary } from 'cloudinary'
import { UploadedFile } from 'express-fileupload';


interface uploadFileType {
    file : UploadedFile;
    fileType : "image" | "video" | "raw" | "auto" | undefined;
}

interface deleteFileType {
    public_id : string;
    resource_type : "image" | "video" | "raw" | "auto" | undefined;
}

export const isFileSupport = (fileType: string, supportType : string[]) => {
    console.log(fileType);
    if(supportType.includes(fileType)){
        return true;
    }
}

export const uploadFile = async({file , fileType} : uploadFileType) => {
    const upload =  await cloudinary.uploader.upload(file.tempFilePath , {resource_type : fileType , folder : 'Study Notion' , use_filename: true ,  filename_override: file.name})
    return upload;
}

export const deleteFile = async({public_id  , resource_type} : deleteFileType) => {
    return await cloudinary.uploader.destroy(public_id , {resource_type})
}