import { Request , Response } from "express";
import { UploadedFile, FileArray } from 'express-fileupload';
import {fileTypeFromFile} from 'file-type';
import { uploadFile , isFileSupport } from "../utils/cloudinaryServies";


export const imageUploadToCloudinary = async(req : Request , res : Response) => {
    try{
        console.log("inside image upload")
        const files = req.files as FileArray;
        const imageFile = files.imageFile as UploadedFile;

        if (!req.files || !('imageFile' in req.files)) {
                 res.status(400).send({
                 success: false,
                 message: "imageFile required"
                 });
            }

            console.log(imageFile);

            // checking file type
             const fileType =  await fileTypeFromFile(imageFile.tempFilePath);
             console.log(fileType);

             if(!fileType?.mime.startsWith('image')){
                res.status(400).send({
                    success : false,
                    message : `${fileType?.mime} file is not supported`
                })
                return;
             }

             // now check imageFile supported or not
            const imageSupport = ['jpg' , 'jpeg' , 'png' , 'svg'];
            if(!isFileSupport(fileType.ext.toLowerCase() , imageSupport)){
                 res.status(400).send({
                    success : false,
                    message : `image type ${fileType.ext.toLowerCase()} is not supported`
                })
                return;
            }

            // now upload to cloudinary
            const uploadPayload = {file : imageFile , fileType: "image" as "image"}
            const uploadImage = await uploadFile(uploadPayload);

             res.status(200).send({
                success : true,
                message : "Image uploaded",
                secure_url: uploadImage.secure_url
              })
            

    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in image file upload to cloudinary",
                error : errorMessage
            })
    }
}

export const videoUploadToCloudinary = async(req : Request , res : Response) => {
    try{
        console.log("inside video upload")
        const files = req.files as FileArray;
        const videoFile = files.imageFile as UploadedFile;

       // pending...

    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes in video upload to cloudinary",
                error : errorMessage
            })
    }
}

