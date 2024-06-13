
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from "../../Api/backendAuth"
import { toast } from 'react-toastify'

const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        seterror("")
        setloading(true)

        try {
            const registerUser = await authService.registerUser(email, password, userName)
            if (registerUser) {
                const loginUser = await authService.loginUser(email, password)

                if (loginUser) {
                    navigate("/")
                }
                toast.success('User registered')
            }
            setloading(false)
        } catch (error) {
            toast.error(error.response?.data?.message)
            setloading(false)
            seterror(error.response.data.message)
            console.log(error.response.data.message)
            // console.log(error.response.data.message)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
                <form className="space-y-4" onSubmit={(e) => { submitHandler(e) }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">User name</label>
                        <input
                            onChange={(e) => { setUserName(e.target.value) }}
                            type="text"
                            required
                            className="mt-1 block w-full 
                            border-gray border-2
                            rounded-md border-gray-300 
                            focus:border-gray-700
                            outline-none p-2"
                            placeholder="Your userName"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 block w-full 
                            border-gray border-2
                            rounded-md border-gray-300 
                            focus:border-gray-700
                            outline-none p-2"
                            placeholder="Your email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            autoComplete="current-password"
                            required
                            className="mt-1 block w-full 
                            border-gray border-2
                            rounded-md border-gray-300 
                            focus:border-gray-700
                            outline-none p-2"
                            placeholder="Your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                        </div>
                        {error? (<div className="text-sm">
                            <p className="font-medium text-red-600 ">{error}</p>
                        </div>):null}
                    </div>
                    <button
                    disabled={loading}
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {loading?"Loading":"Register"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account? <Link to={"/login"} className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register