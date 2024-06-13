import { Link, Outlet } from 'react-router-dom'
import LogoutBtn from '../auth/LogoutBtn'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Header = () => {

    const authStatus = useSelector(state => state.auth.status)
    const isAdmin = useSelector(state => state.auth.isAdmin)

    const [toggleMenuBtn, setToggleMenuBtn] = useState(false)

    const links = [
        // {
        //     label: "Home",
        //     routs: "/",
        //     // imgurl: "/icons/home.svg"
        // },
        {
            label: "Home",
            routs: "/",
            imgurl: "/svg/home.svg"
        },
        {
            label: "Cart",
            routs: "/cart",
            imgurl: "/svg/cart.svg"
        },
        {
            label: "Orders",
            routs: "/orders",
            imgurl: "/svg/order.svg"
        },

        {
            label: "Account",
            routs: "/account",
            imgurl: "/svg/account.svg"
        },
        //     {
        //         label: "Settings",
        //         routs: "/settings",
        //         // imgurl: "/icons/settings.svg"
        //     },
    ];
    return (
        <div className='px-3 flex justify-between items-center'>
            {/* absolute z-50 top-0  */}
            <div className='flex justify-start items-center h-16'>
                <Link to={"/"} className='text-3xl poppins-regular tracking-tight text-black dark:text-white'>Ecommerce</Link>
                {/* <img className='h-20' src={"/logo/pngwing.com.png"} alt={"logo"} /> */}
            </div>

            <nav className=''>
                <button onClick={() => setToggleMenuBtn(!toggleMenuBtn)} type='button' className='bg-blue-500 rounded-2xl px-3 py-1 text-white hover:bg-blue-600 active:bg-blue-700 md:hidden'>menu</button>

                <div className={`md:flex md:relative z-20 inset-0 bg-white md:left-0 md:px-0 md:py-0 py-8 px-8 ${toggleMenuBtn ? "left-0" : "left-full"} fixed items-center justify-between gap-7 duration-150 ease-in`}>

                    <button onClick={() => setToggleMenuBtn(!toggleMenuBtn)} type='button' className='bg-blue-500 rounded-2xl px-3 py-1 text-white hover:bg-blue-600 active:bg-blue-700 md:hidden absolute  right-4'>X</button>
                    {links.map((link) => (
                        <Link to={link.routs} key={link.label}>
                            <div className='h-16 pt-1 flex items-center border-b-4 border-b-transparent hover:border-red-500'>
                                <img className='h-6' src={link.imgurl} alt={link.label} />
                                <p>{link.label}</p>
                            </div>
                        </Link>
                    ))}
                    {isAdmin ? (


                        <Link className='h-16 pt-1 flex items-center border-b-4 border-b-transparent hover:border-purple-600' to={"/admin/dash/"} alt="logout" >Admin</Link>


                    ) : null}
                    {authStatus ? (
                        <div className='h-16 pt-1 flex items-center border-b-4 border-b-transparent hover:border-red-600'>
                            <img src={"/svg/logout.svg"} alt="logout" />
                            <LogoutBtn />
                        </div>) : (
                        <Link className='h-16 pt-1 flex items-center border-b-4 border-b-transparent hover:border-green-500' to={"/login"}>
                            <img src={"/svg/login.svg"} alt="login" />
                            <p>Login</p>
                        </Link>)}
                </div>


            </nav>

            <Outlet />
        </div>
    )
}

export default Header