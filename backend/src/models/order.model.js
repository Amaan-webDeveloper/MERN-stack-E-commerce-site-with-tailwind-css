import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },

    quantity: {
        type: Number,
        require: true,
    },
});

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        orderItems: {
            type: [orderItemSchema],
        },
        address: [
            {
                type: String,
                required: true,
            },
        ],
        phoneNo:{
            type:String,
            required:true
        },
        pinCode:{
            type:Number,
            required:true
        },
        charges:{
            type:Number,
            required:true
        },
        discount:{
            type:Number,
            required:true
        },
        total:{
            type:Number,
            required:true
        },
        
        status:{
            type:String,
            enum:["pending","cancelled","delivered"],
            default:"pending"
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order",orderSchema)