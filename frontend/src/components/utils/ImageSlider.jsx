import React, { useState } from 'react'


const ImageSlider = ({ imagesArray }) => {

    

    const [currentIndex, setcurrentIndex] = useState(0)

    const goToNext = () => {
        const isLastSlide = currentIndex + 1 === imagesArray.length ;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setcurrentIndex(newIndex)
    }
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? imagesArray.length - 1 : currentIndex - 1;
        setcurrentIndex(newIndex)
    }
    return (
        <div className='h-full w-full relative'>

            <div className='w-full h-full flex overflow-hidden'>
                {imagesArray?.map((image) => (
                    <img style={{ translate: `${-100 * currentIndex}%`, transition: "translate 300ms ease-in-out" }} className='object-cover w-full h-full block flex-shrink-0 flex-grow-0' key={image} src={image} alt="" />
                ))}
            </div>

            <div className='block absolute top-1/2 p-4 right-0 cursor-pointer' onClick={(e) => { goToNext() }}>
                <img src={"/svg/right.svg"} alt="Left" />
            </div>
            <div className='block absolute top-1/2 p-4 cursor-pointer' onClick={(e) => { goToPrevious() }}>
                <img src={"/svg/left.svg"} alt="Right" />
            </div>

            <div className="absolute flex gap-1 bottom-2 left-1/2" style={{translate:'-50%'}}>

                {imagesArray?.map((_,index)=>(
                    
                    <button onClick={()=>setcurrentIndex(index)} key={index}>
                        
                        {index === currentIndex? <img className="h-4" src={"/svg/selectedDot.svg"}/>:
                        <img className="h-4" src={"/svg/notSelectedDot.svg"}/>
                        }
                    </button>

                ))}

            </div>

            {/* <img className='object-cover w-full h-full block' src={slides[currentIndex].url} alt="" /> */}

        </div>
    )
}

export default ImageSlider