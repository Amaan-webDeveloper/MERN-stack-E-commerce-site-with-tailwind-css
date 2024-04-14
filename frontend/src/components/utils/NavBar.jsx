import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogoutBtn } from ".."
import { useSelector } from 'react-redux'

const NavBar = () => {

    const authStatus = useSelector(state => state.auth.status)
    const isAdmin = useSelector(state => state.auth.isAdmin)
    
    const navigate = useNavigate()
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
        <div>
            <nav className='absolute top-0 w-screen border-b-2 border-zinc-300 box-border h-16 flex items-center justify-between gap-7'>
                <div className='mr-auto'><img className='h-20' src={"/logo/pngwing.com.png"} alt={"logo"} /></div>
                {links.map((link) => (
                    <NavLink to={link.routs} key={link.label}
                        className={"flex items-center justify-center text-xs"}
                    >
                        <img className='h-6' src={link.imgurl} alt={link.label} />
                        <p>{link.label}</p>
                    </NavLink>
                ))}
                {isAdmin ? (


                    <Link className='flex items-center justify-center text-xs' to={"/admin/dash"}><img src={"/svg/admin.svg"} alt="logout" />Admin</Link>


                ) : null}
                {authStatus ? (
                    <div className='flex m-5 items-center justify-center text-xs'>
                        <img src={"/svg/logout.svg"} alt="logout" />
                        <LogoutBtn />
                    </div>) : (
                    <Link className='m-5 text-xs flex items-center justify-center' to={"/login"}>
                        <img src={"/svg/login.svg"} alt="login" />
                        <p>Login</p>
                    </Link>)}
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar