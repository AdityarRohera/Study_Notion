import mongoose, { Schema } from "mongoose";

interface categorySchemaType {
    name : string;
    // desc : string
}

const categorySchema : Schema<categorySchemaType> = new Schema<categorySchemaType>({
    name : {
        type : String,
        required : true,
        trim : true
    },
    // desc : {
    //     type : String,
    //     required : true,
    //     trim : true
    // }
})

const categoryModel : mongoose.Model<categorySchemaType> = mongoose.model('categories' , categorySchema);
export default categoryModel;