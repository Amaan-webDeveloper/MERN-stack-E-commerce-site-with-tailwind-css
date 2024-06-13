import { Outlet } from "react-router-dom"


const ProductContainer = ({children}) => {
  
  return <div className="flex flex-wrap justify-center gap-8 w-full border-t-2 border-gray-300 relative px-4 pt-5">
    
    {children}</div>
  
}

export default ProductContainer