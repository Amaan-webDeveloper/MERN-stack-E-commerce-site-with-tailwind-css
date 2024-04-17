import { useEffect, useState } from 'react'
import ServiceObj from '../../Api/backendConfig'

import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productImages, setProductImages] = useState(null);
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');

    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [msg, setmsg] = useState(null)



    const [showProductImg, setShowProductImg] = useState([])
    
    const [categoryArray, setCategoryArray] = useState([])

    const [prevProduct, setPrevProduct] = useState([])


    const { id } = useParams()


    useEffect(() => {
        (async () => {
            if (id) {
                const res = await ServiceObj.getProduct(id)
                if (res) {
                    console.log(res)
                    setName(res.data.data.name || "")
                    setPrice(res.data.data.price || "")
                    setDescription(res.data.data.description || "")
                    setProductImages(res.data.data.productImages || "")
                    // setCategory(res.data.data.category || "")
                    setStock(res.data.data.stock || "")

                    setShowProductImg(res.data.data.productImages)

                    // setProductImages()
                }
            }
        })()
    }, [id, navigate])


    useEffect(() => {
        (async () => {
            const res = await ServiceObj.getAllCategories()
            setCategoryArray(res.data.data)
            // console.log(res.data.data)
        })()
        
    }, [navigate])




    const handleChangeImages = async (e) => {


        // setProductImages(e.target.files)


        const files = Array.from(e.target.files)

        // 
        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(i, file);
        });


        setProductImages(formData);



        const promises = [];

        files.forEach((file) => {
            promises.push(readImage(file));
        });

        Promise.all(promises)
            .then((base64Images) => {
                setShowProductImg(base64Images);
                // setError(null);
            })
            .catch((error) => {
                console.error('Error reading files:', error);
                // setError('Error reading files. Please try again.');
            });
    }

    const readImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('stock', stock);

        productImages.forEach((image) => {
            formData.append(`productImages`, image);
        });

        try {
            // name, price, description, productImages, category, stock
            setloading(true)
            // console.log(name, price, description, productImages, category, stock)
            const newProduct = await ServiceObj.updateProduct(formData)

            if (newProduct) {
                // console.log(newProduct)
                navigate("/")
            }
            // console.log(loginUser)
            setmsg(null)
            setloading(false)


        } catch (error) {
            setloading(false)

            setmsg(error.response.data.message)
            console.log(error)
        }


    };


    const handleDelete = async(e)=>{
        e.preventDefault()
        try {
            
            setloading(true)
            
            const deleteProduct = await ServiceObj.deleteProduct(id)

            if (deleteProduct) {
                
                navigate("/")
            }
            // console.log(loginUser)
            setmsg(null)
            setloading(false)


        } catch (error) {
            setloading(false)

            setmsg(error.response.data.message)
            console.log(error)
        }
    }



    // console.log(productImages)

    return (
        <div className='pt-16 w-full flex flex-cal items-center justify-center'>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col w-80 p-2 shadow-lg ">


                <div className="mb-1">
                    <label htmlFor="name" className="block">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-1 py-1" />
                </div>
                <div className="mb-2">
                    <label htmlFor="price" className="block">Price:</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 rounded-md px-1 py-1" />
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="block">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-md px-1 py-1"></textarea>
                </div>

                <div className='flex flex-wrap w-sm justify-center items-center shadow-md gap-3'>
                    {showProductImg?.map((image) => {
                        return <img key={image} src={image} className='w-24 object-cover' />
                    })}
                </div>

                <div className="mb-2">
                    {productImages ? <p>{productImages?.length} images selected</p> : <p>no images are selected</p>}
                    <label htmlFor="productImages" className="block">Product Images:</label>
                    <input type="file" id="productImages" onChange={async (e) => handleChangeImages(e)
                    } multiple className="w-full border border-gray-300 rounded-md px-1 py-1" />
                </div>
                <div className="mb-2 flex items-center gap-3 ">
                    <label htmlFor="category" className="block">Category:</label>
                    {/* <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-md px-1 py-1" /> */}

                    <select value={category} onChange={(e) => setCategory(e.target.value)} className='mt-2 border-2 border-black' placeholder="All categories" >
                        {categoryArray.map((category) => (
                            <option key={category._id} value={category.name}>{category.name}</option>
                        ))}
                    </select>

                </div>
                <div className="mb-2">
                    <label htmlFor="stock" className="block">Stock:</label>
                    <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border border-gray-300 rounded-md px-1 py-1" />
                </div>
                {msg ? (<p>{msg}</p>) : null}
                {loading ? (<p>Loading please wait...</p>) : null}

                <button type="submit" className="bg-blue-500 text-white px-1 py-1 rounded-md">Update Product</button>

                

            </form>
            <button type='button' className='absolute top-16 right-2 mt-2 p-2 bg-red-500 rounded-lg text-white' onClick={(e)=>{
                handleDelete(e)
            }}>Delete The product?</button>
            <div className="">


            </div>
            {/* <div className='bg-red-500 min-w-72 w-full'>wow</div> */}
        </div>
    );
}

export default UpdateProduct