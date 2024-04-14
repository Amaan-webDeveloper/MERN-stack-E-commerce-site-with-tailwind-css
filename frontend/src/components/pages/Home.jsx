import React, { useEffect, useState } from 'react'
import { Container, ImageSlider } from ".."
import { useSelector } from 'react-redux'
import ProductCard from '../utils/ProductCard'
import ProductContainer from '../container/ProductContainer.jsx'
import ServiceObj from '../../Api/backendConfig.js'

const Home = () => {
    const [products, setProducts] = useState([])

    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        (async () => {
            const res = await ServiceObj.getAllProducts()
            setProducts(res.data.data)
            console.log(res.data.data)
        })()
    }, [])



    return (
        // <Container>
        <div className='pt-16 h-screen w-screen'>
            <div className='lg:h-3/4 sm:h-1/2 h-2/5 mx-auto my-0 w-screen max-w-full bg-slate-600'>
                <ImageSlider imagesArray={[
        "/sliderImges/topcar_porsche_911_turbo_s_stinger_gtr_carbon_edition_4k_3-3840x2160.jpg" ,
        "/sliderImges/topcar_porsche_911_turbo_s_stinger_gtr_carbon_edition_2022_5k_7-1920x1080.jpg" ,

    ]}/>
            </div>
            
                <ProductContainer>
                    {products.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </ProductContainer>
            
        </div>
        // </Container>
    )
}

export default Home