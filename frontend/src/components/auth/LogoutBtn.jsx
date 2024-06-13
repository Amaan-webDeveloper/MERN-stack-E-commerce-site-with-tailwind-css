
import { useDispatch } from 'react-redux'
import { logout as authLogOut } from '../../features/authSlice'
import { toast } from 'react-toastify'
import authService from '../../Api/backendAuth'

const LogoutBtn = ({...props}) => {
    const dispatch = useDispatch()


    const logoutHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await authService.logoutUser()
            if (res) {
                toast.info("User logout")
                return dispatch(authLogOut())
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button className={{...props}} onClick={(e) => { logoutHandler(e) }}>Logout</button>
    )
}

export default LogoutBtn