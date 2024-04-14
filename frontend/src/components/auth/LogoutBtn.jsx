import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout as authLogOut } from '../../features/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()


    const logoutHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/users/logout")
            if (res) {
                return dispatch(authLogOut())
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button onClick={(e) => { logoutHandler(e) }}>Logout</button>
    )
}

export default LogoutBtn