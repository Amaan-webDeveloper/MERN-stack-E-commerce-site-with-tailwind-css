import React from 'react'
import { useSelector } from 'react-redux'
import Login from "../auth/Login"
import LogoutBtn from '../auth/LogoutBtn'
const Account = () => {

    const authStatus = useSelector(state => state.auth.status)
    const currentUser = useSelector(state => state.auth.userData)

    if (authStatus) {
        return(
            <div className='pt-16 w-screen flex items-center justify-center h-screen'>
                <div className=' shadow-md p-6 w-1/2 flex items-center flex-col min-w-44 gap-4'>
                    <img src={"/svg/account.svg"} className='h-16' alt="" />
                    <p className='bg-white text-2xl'>{currentUser?.userName}</p>
                    <p className='bg-white text-xl'>{currentUser?.email}</p>
                    <div className='flex p-2 rounded-lg bg-blue-500 m-5 items-center justify-center text-lg'>
                        <img src={"/svg/logout.svg"} alt="logout" />
                        <LogoutBtn />
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <Login/>
        )
    }
}

export default Account