import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import noPic from '../img/no-pic.png'

const obsImages = ({img}) => {
  console.log(img)
  if (img && img[0]) {
    return (
      <Carousel className='carousel-locked'>
        {img.map((image, idx) => (
          <Carousel.Item key={idx} >
            <Image src={image} fluid />
          </Carousel.Item>))
        }
      </Carousel>
    )
  } else {
     return (
       <>
         <img class='logo-fill mx-auto' src={noPic} />
         <p class='text-center'>No images for this observation</p>
       </>
     )
  }

}

export default obsImages
