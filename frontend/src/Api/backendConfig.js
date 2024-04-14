import axios from "axios";

// name, price, description, productImages, category, stock
export class Service {
    async createProduct(formData) {
        try {
            const res = await axios.post("/api/v1/product/admin/createproduct", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                //     // "Connection":"keep-alive"
                }
            })
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }
    

    async getAllProducts(){
        try {
            const res = await axios.post("/api/v1/product/getallproducts")
        
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }


    async getProduct(id){
        try {
            const res = await axios.post("/api/v1/product/getproduct",{id})

            return res
        } catch (error) {
            console.log(error)
        }
    }

    async createCategory(name){
        try {
            const res = await axios.post("/api/v1/category/admin/createcatagory",{name})
        
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }

    async updateProduct(formData){
        try {
            const res = await axios.post("/api/v1/product/admin/updateproduct", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                //     // "Connection":"keep-alive"
                }
            })
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            console.log(id)
            const res = await axios.post("/api/v1/product/admin/deleteproduct",{id})
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }

    async getAllCategories(){
        try {
            const res = await axios.post("/api/v1/category/getallcategoies")
            return res;
        } catch (error) {
            console.log(error)
        }
    }
}


const ServiceObj = new Service();
// authService.createAccount
export default ServiceObj;