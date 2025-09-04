import { Request , Response } from "express";
import { UploadedFile, FileArray } from 'express-fileupload';
import {fileTypeFromFile} from 'file-type';
import { uploadFile , isFileSupport , deleteFile } from "../utils/cloudinaryServies";
import courseModel from "../models/courseModel";
import { extractPublicId } from 'cloudinary-build-url';
import courseSubSectionModel from "../models/CourseSubSection";

function getPublicIdFromImageUrl(url: string) {
    // Extract after /upload/
    const path = url.split('/upload/')[1];
    if (!path) return '';
    // Remove version number if exists (v123456789/)
    const withoutVersion = path.replace(/^v\d+\//, '');
    // Remove extension
    return withoutVersion.replace(/\.[^/.]+$/, '');
}



export const imageUploadToCloudinary = async(req : Request , res : Response) => {
    try{
        console.log("inside image upload")
        const files = req.files as FileArray;
        // console.log(files)
        const imageFile = files.imageFile as UploadedFile;
        console.log(files);

        if (!req.files || !('imageFile' in req.files)) {
                 res.status(400).send({
                 success: false,
                 message: "imageFile required"
                 });
                 return;
            }

            // checking file type
             const fileType =  await fileTypeFromFile(imageFile.tempFilePath);
            //  console.log(fileType);

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
            console.log(uploadImage);

             res.status(200).send({
                success : true,
                message : "Image uploaded",
                // uploadData : {secure_url: uploadImage.secure_url , publicId : uploadImage.public_id , signature : uploadImage.signature}
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
            //  console.log(fileType);

             if(!fileType?.mime.startsWith('video')){
                res.status(400).send({
                    success : false,
                    message : `${fileType?.mime} file is not supported`
                })
                return;
             }

       // check video type is supported or not

       const videoSupportedType = ['mp4', 'mov', 'avi', 'wmv', 'mkv', 'webm' , 'mts'];
       
       if(!isFileSupport(fileType.ext.toLowerCase() , videoSupportedType)){
            res.status(400).send({
                    success : false,
                    message : `video type ${fileType.ext.toLowerCase()} is not supported`
                })
                return;
       }
       // then check size of video file is less than 5mb or not

       if(videoFile.size > 100 * 1024 * 1024){
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

// delete from db pending

export const deleteImageFromCloudinary = async(req : Request , res : Response) => {
    try{

        const {imageURL} = req.body;
        console.log(imageURL);

        if(!imageURL){
            res.status(400).send({
                success : false,
                message : "Missing imageURL"
            })
            return;
        }

        // delete from db
        const course = await courseModel.findOne({ thumbnail: imageURL }).exec();
        console.log(course)
        if (!course) {
            res.status(404).send({ success: false, message: "Thumbnail not found in DB" });
            return;
        }

        console.log("Course finded from database -> " , course);

    //    const public_id = decodeURIComponent(extractPublicId(imageURL));
    //    const public_ID = public_id.replace(/\.[^/.]+$/, ""); // just remove extension
    //    console.log("Delete image id decoded ->", public_ID);

            // now delete from cloudinary

        const publicId = decodeURIComponent(getPublicIdFromImageUrl(imageURL));
        console.log("Delete image id decoded ->", publicId);

        // everything is fine now delete inage from cloudinary
       const deleteImage = await deleteFile({public_id : publicId , resource_type : 'image'});
       console.log(deleteImage);
        
       if(deleteImage.result !== "ok"){
            res.status(400).send({
                success : false,
                message : "Cloudinary file not found"
            })
            return;
       }

       // Remove from DB
        course.thumbnail = null;
        await course.save();

       // now delete from dataBase

         res.status(200).send({ success: true, message: "Thumbnail deleted successfully" });


    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            } else{
                errorMessage = err;
            }
            res.status(500).send({
                success : false,
                message : "Error comes in delete image from cloudinary",
                error : errorMessage
            })
    }
}

export const deleteVideoFromCloudinary = async(req : Request , res : Response) => {
    try{

        const {videoURL} = req.body;
        console.log(videoURL);

        if(!videoURL){
            res.status(400).send({
                success : false,
                message : "Missing videoURL"
            })
            return;
        }

        // search imageExist or not
        const findVideo = await courseSubSectionModel.findOne({videoUrl : videoURL}).exec();;
        if(!findVideo){
            res.status(401).send({
                success : false,
                message: "Invalid videoURL, no video found in database",
            })
            return;
        }

        // console.log("Course finded from database -> " , findVideo);

       const public_id = decodeURIComponent(extractPublicId(videoURL));
       const public_ID = public_id.replace(/\.[^/.]+$/, ""); // just remove extension
       console.log("Delete video id decoded ->", public_ID);

        console.log("Delete video id decoded -> " , public_ID);

        // everything is fine now delete inage from cloudinary
       const deleteVideo = await deleteFile({public_id : public_ID , resource_type : "video"});
       console.log(deleteVideo);
        
       if(deleteVideo.result === 'not found'){
            res.status(400).send({
                success : false,
                message : "video file not found on cloudinary"
            })
            return;
       }

       findVideo.videoUrl = null;
       await findVideo.save();

        res.status(200).send({
            success : true,
             message: "Video file deleted successfully",
        })


    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            } else{
                errorMessage = err;
            }
            res.status(500).send({
                success : false,
                message : "Error comes in delete video from cloudinary",
                error : errorMessage
            })
    }
}