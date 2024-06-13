import React, { useEffect, useState } from 'react'
// import { Container, ImageSlider } from ".."
import { useSelector } from 'react-redux'
import ProductCard from '../utils/ProductCard'
import ProductContainer from '../container/ProductContainer.jsx'
import ServiceObj from '../../Api/backendConfig.js'

const Home = () => {
    const [products, setProducts] = useState([])

    const [sort, setSort] = useState(false)
    const [priceRange, setPriceRange] = useState(10000000)
    const [sCategory, setSCategory] = useState("")
    const [categoryArray, setCategoryArray] = useState([])
    const [searchQ, setSearchQ] = useState("")
    const [page, setPage] = useState(1)

    const [toggleFilter, settoggleFilter] = useState(false)

    const [totalPage, settotalPage] = useState("")

    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        (async () => {
            const res = await ServiceObj.getAllCategories()
            setCategoryArray(res.data.data)
        })()

    }, [])
    useEffect(() => {
        (async () => {
            const res = await ServiceObj.getAllProducts({ page, searchQ, sort, priceRange, sCategory })
            console.log(res.data.totalPages)
            settotalPage(res.data.totalPages)
            setProducts(res.data.data)
        })()
    }, [sort, priceRange, sCategory, searchQ, page])






    return (
        // h-screen w-screen
            <div className='flex  overflow-x-hidden relative'>


                {/* <div className={`shadow-2xl w-1/4 p-6 flex-col border-t-2 border-r-2 border-gray-300 ${toggleFilter ? "flex" : "hidden"}`}>
                    <p className='text-xl w-60'>Fillters</p>

                    <input type="text" value={searchQ} onChange={(e) => { setSearchQ(e.target.value) }} placeholder='Search' className='bg-slate-300 rounded-lg p-2 outline-none' />

                    <p className='mt-3'>Sort</p>
                    <select className='bg-slate-300 p-2 outline-none rounded-lg' onChange={(e) => { setSort(e.target.value) }}>
                        <option value={false}>None</option>
                        <option value="desc">High to Low</option>
                        <option value="asc">Low to High</option>
                    </select>

                    <p className='mt-3'>Price: {priceRange}</p>
                    <input type="range" value={priceRange / 5000} onChange={(e) => {
                        setPriceRange(e.target.value * 5000)
                    }} />

                    <p className='mt-3'>Category</p>
                    <select value={sCategory} className='bg-slate-300 p-2 rounded-lg outline-none' onChange={(e) => { setSCategory(e.target.value) }}>
                        {categoryArray.map((category) => (
                            <option key={category._id} value={category.name}>{category.name}</option>
                        ))}
                    </select>

                    <button onClick={() => settoggleFilter(false)} className='bg-blue-500 text-white p-2 rounded-lg mt-3'>Close</button>
                </div> */}


                {/* <button type='button' onClick={() => settoggleFilter(true)} className={`ml-4 px-3 py-2 rounded-lg bg-gray-500 sticky top-0 text-white ${toggleFilter ? "hidden" : null}`}>Filter</button> */}


                <ProductContainer>
                    {products.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}

                    <div className='flex  items-center justify-center absolute bottom-2 mt-3'>
                        <button onClick={() => { page > 1 ? setPage(page - 1) : null }}><img src={"/svg/left.svg"} alt="" /></button>
                        {page}
                        <button onClick={() => { page < totalPage ? setPage(page + 1) : null }}><img src={"/svg/right.svg"} alt="" /></button>
                    </div>
                </ProductContainer>


            </div>
    )
}

export default Home

{/* <div className='lg:h-3/4 sm:h-1/2 h-2/5 mx-auto my-0 w-screen max-w-full bg-slate-600'>
                    <ImageSlider imagesArray={[
                        "/sliderImges/topcar_porsche_911_turbo_s_stinger_gtr_carbon_edition_4k_3-3840x2160.jpg",
                        "/sliderImges/topcar_porsche_911_turbo_s_stinger_gtr_carbon_edition_2022_5k_7-1920x1080.jpg",

                    ]} />
                </div> */}