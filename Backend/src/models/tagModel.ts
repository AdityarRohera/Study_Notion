import mongoose, { Schema } from "mongoose";

interface tagSchemaType {
    name : string;
    desc : string
}

const tagSchema : Schema<tagSchemaType> = new Schema<tagSchemaType>({
    name : {
        type : String,
        required : true,
        trim : true
    },
    desc : {
        type : String,
        required : true,
        trim : true
    }
})

const tagModel : mongoose.Model<tagSchemaType> = mongoose.model('tags' , tagSchema);
export default tagModel;