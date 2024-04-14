

import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';
import { resolve } from "path";
import { rejects } from "assert";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinery = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // console.log(res.url)
        fs.unlinkSync(localFilePath)
        return res.url;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}


const uploadMultipleOnCloudinery = async (localFilePaths)=>{

    try {
        const uploadPromises = localFilePaths.map(async (path) => {
            return await uploadOnCloudinery(path);
        });

        const uploadedResults = await Promise.all(uploadPromises);
        return uploadedResults;
    } catch (error) {
        throw error;
    }







    // return new Promise((resolve,reject)=>{
    //     const res = localFilePaths.map((path)=> uploadOnCloudinery(path));
    //     Promise.all(res)
    //     .then((values)=> resolve(values))
    //     .catch((err)=> reject(err))
    // })
}




export {uploadOnCloudinery,uploadMultipleOnCloudinery}

// export {uploadOnCloudinery}






