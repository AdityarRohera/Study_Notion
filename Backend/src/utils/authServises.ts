import profileModel from "../models/ProfileModel"
import mongoose, { Types } from "mongoose";
import userModel from "../models/userModel";

interface ProfilePayloadType {
    gender : string | null;
    dateOfBirth : number | null;
    about : string | null;
}

interface UserPayloadType {
    firstName : string;
    lastName : string;
    email : string;
    contact_no : number;
    password : string;
    account_type : string;
    additional_info : Types.ObjectId;
}
export const additionalProfile = async(additionalProfilePayload : ProfilePayloadType) => {
     const createProfile = await profileModel.create(additionalProfilePayload);
     return createProfile;
}

export const createUserFunc = async(createUserPayload : UserPayloadType) => {
    const createUser = await userModel.create(createUserPayload);
    return createUser;
}

export const updateUser = async(password : string , email : string) => {
    const updatePassword = await userModel.findOneAndUpdate({email} , {password});
    return updatePassword;
}

export const findUserById = async(userId : mongoose.Types.ObjectId) => {
    return await userModel.findById(userId);
}