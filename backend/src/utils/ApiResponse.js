class ApiResponse {
    constructor(statusCode,data,message="success",totalPages = 1){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.totalPages = totalPages
        this.success= statusCode < 400
    }
    
}

export default ApiResponse