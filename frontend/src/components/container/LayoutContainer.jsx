
import {Header} from "../../components"

const LayoutContainer = ({ children }) => {
    return (
        // `${darkMode && "dark"}`

        <div className="flex flex-col dark:bg-neutral-900 min-h-screen">
            <Header />


            {children}
        </div>


    )
}

export default LayoutContainer