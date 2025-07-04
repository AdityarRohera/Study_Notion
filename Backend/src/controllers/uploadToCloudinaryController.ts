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
                 return;
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

            //  // now check imageFile supported or not
            const imageSupport = ['jpg' , 'jpeg' , 'png' , 'svg'];
            if(!isFileSupport(fileType.ext.toLowerCase() , imageSupport)){
                 res.status(400).send({
                    success : false,
                    message : `image type ${fileType.ext.toLowerCase()} is not supported`
                })
                return;
            }

            // // checking size of image for upload
                if(imageFile.size > 1 * 1024 * 1024){
                    res.status(400).send({
                        success : false,
                        message : "Image size should be less than 1MB"
                    })
                    return;
                }


            // // now upload to cloudinary
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
                message : "Error comes while upload image file to cloudinary",
                error : errorMessage
            })
    }
}

export const videoUploadToCloudinary = async(req : Request , res : Response) => {
    try{
        console.log("inside video upload")
        const files = req.files as FileArray;
        const videoFile = files.videoFile as UploadedFile;

       // first check videoFile is uploaded or not

       if(!videoFile){
            res.status(400).send({
                success : false,
                message : "Video File Required"
            })
            return;
       }

       // second check type of file is video or not
             const fileType =  await fileTypeFromFile(videoFile.tempFilePath);
             console.log(fileType);

             if(!fileType?.mime.startsWith('video')){
                res.status(400).send({
                    success : false,
                    message : `${fileType?.mime} file is not supported`
                })
                return;
             }

       // check video type is supported or not

       const videoSupportedType = ['mp4', 'mov', 'avi', 'wmv', 'mkv', 'webm'];
       
       if(!isFileSupport(fileType.ext.toLowerCase() , videoSupportedType)){
            res.status(400).send({
                    success : false,
                    message : `video type ${fileType.ext.toLowerCase()} is not supported`
                })
                return;
       }
       // then check size of video file is less than 5mb or not

       if(videoFile.size > 5 * 1024 * 1024){
            res.status(400).send({
                success : false,
                message : "video file should be less than 5MB"
            })
            return;
       }
       // if all test pass then upload to clodinary and return response url
            const uploadPayload = {file : videoFile , fileType: "video" as "video"}
            const uploadVideo = await uploadFile(uploadPayload);

             res.status(200).send({
                success : true,
                message : "Video uploaded",
                secure_url: uploadVideo.secure_url
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
                message : "Error comes in video upload to cloudinary",
                error : errorMessage
            })
    }
}

