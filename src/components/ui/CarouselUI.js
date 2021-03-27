import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export const CarouselUI = () => {

  const imagesUrl = [
    {
      id:1,
      url: 'https://www.gettyimages.es/gi-resources/images/500px/983794168.jpg',
      label: 'Legend 1'
    },
    {
      id:2,
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      label: 'Legend 2'
    },
    {
      id:3,
      url: 'https://cdn.pixabay.com/photo/2016/08/09/21/54/lake-1581879__340.jpg',
      label: 'Legend 3'
    }
  ]
  return (
    <Carousel
      dynamicHeight={true}
      emulateTouch={true}
      showThumbs={false}
      autoPlay={true}
      stopOnHover={true}
      infiniteLoop={true}
      showStatus={false}
    >
        {
          imagesUrl.map( item => (
            <div key={item.id}>
              <img className="carousel__img-size" src={item.url} />
              <p className="legend">{item.label}</p>
            </div>
          ))
        }
    </Carousel>
  )
}
