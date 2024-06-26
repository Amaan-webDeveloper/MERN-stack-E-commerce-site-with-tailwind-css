import axios from "axios";


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
    

    async getAllProducts({page,searchQ,sort,priceRange,sCategory}){
        try {
            console.log(searchQ,sort,priceRange,sCategory)
            const res = await axios.post(`/api/v1/product/getallproducts?searchQ=${searchQ}&sort=${sort}&priceRange=${priceRange}&sCategory=${sCategory}&page=${page}`)
        
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }
    async adminGetAllProducts(){
        try {
            const res = await axios.post(`/api/v1/product/admin/adminGetAllProduct`)
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
            const res = await axios.post(`/api/v1/product/getproduct/${id}`)

            return res
        } catch (error) {
            console.log(error)
        }
    }
    async getProductsArray(idsArray){
        try {
            const res = await axios.post(`/api/v1/product/getproductsarray`,idsArray)

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

    // 

    async newOrder({productIdandQuantity,subTotal, phoneNo, address, pinCode, charges, discount, total}){
        try {
            const res = await axios.post("/api/v1/order/new-order",{productIdandQuantity,subTotal, phoneNo, address, pinCode, charges, discount, total})
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    async getUserOrders(){
        try {
            const res = await axios.post("/api/v1/order/getuserorders")
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async addToCart({id,quantity}){
        // console.log(productId,quantity)
        try {
            const res = await axios.post(`/api/v1/order/addtocart?productId=${id}&quantity=${quantity}`)
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    async removeFromCart(id){
        try {
            const res = await axios.post(`/api/v1/order/removefromcart/${id}`)
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    async populateUserCart(){
        try {
            const res = await axios.post(`/api/v1/order/populate-user-cart`)
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    async updateUserCart({id,quantity}){
        try {
            const res = await axios.post(`/api/v1/order/update-cart-items?productId=${id}&quantity=${quantity}`)
            return res;
        } catch (error) {
            console.log(error)
        }
    }
}


const ServiceObj = new Service();
// authService.createAccount
export default ServiceObj;