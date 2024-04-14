import axios from "axios";


export class AuthService {
    // constroctor

    async registerUser(email, password, userName, fullName) {
        try {
            const res = await axios.post("/api/v1/users/register", {
                email, password, userName, fullName
            })
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }

    async loginUser(email, password) {
        try {
            const res = await axios.post("/api/v1/users/login", {
                email, password
            })
            return res;
        } catch (error) {
            if (error) {
                throw error
            }
            console.log(error)
        }
    }

    async getCurrentUser() {
        try {
            const res = await axios.post("/api/v1/users/get-current-User")
            if (!res) {
                return null;
            }
            return res;
        } catch (error) {
            // if (error) {
            //     throw error
            // }
            return false
        }
    }

    async refreshAccessToken() {
        try {
            const res = await axios.post("/api/v1/users/refresh-access-token")
            return res;
        } catch (error) {
            // if (error) {
            //     throw error
            // }
            return false;
        }
    }

}

const authService = new AuthService();
// authService.createAccount
export default authService;