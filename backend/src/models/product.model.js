import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        // title:{
        //     type:String,
        //     required:true,
        // },
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String, 
            required:true,
        },
        productImages:[
            {
                type:String,
                required:true,
            }
        ],
        category:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Category",
            }

        ],
        price:{
            type:Number,
            default:0,
        },
        stock:{
            type:Number,
            default:0
        },
        // seller:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"User",
        //     required:true,
        // }
    }
)


export const Product = mongoose.model("Product",productSchema)