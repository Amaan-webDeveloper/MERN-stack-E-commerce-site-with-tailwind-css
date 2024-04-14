import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { login as authLogin, adminLogin } from '../../features/authSlice'
import authService from '../../Api/backendAuth'


export default function Protected({ children, authentication = true }) {

    const authStatus = useSelector(state => state.auth.status)
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        (async () => {

            const getCurrentUser = await authService.getCurrentUser()


            

            // if (!getCurrentUser) {
            //     const refreshAccess = await authService.refreshAccessToken()
            //     if (!refreshAccess) {
            //         return null
            //     }
            // }
            

            


            if (getCurrentUser) {
                const isAdmin = await getCurrentUser.data.data.isSeller
                if (isAdmin) {
                    // console.log("Admin Logedin",getCurrentUser.data.data)
                    return dispatch(adminLogin(getCurrentUser.data.data))
                }

                console.log(getCurrentUser.data.data)
                // navigate("/")
                return dispatch(authLogin(getCurrentUser.data.data))
            } else {
                console.log("wow")
                const refreshAccess = await authService.refreshAccessToken()
                if (!refreshAccess) {
                    return null
                }


                // if (authentication && authStatus !== authentication) {
                //     console.log("not login")
                //     return null;
                // } else if (!authentication && authStatus !== authentication) {

                //     console.log("not login")

                //     navigate("/")
                // }
            }



        })()
        setLoader(false)
    }, [authentication, navigate, authStatus])


    return loader ? <h1>Loading...</h1> : <>{children}</>
}

