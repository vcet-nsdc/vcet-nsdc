import React from 'react'
import Slider from "react-slick"

function SlickSLide({media}) {
    var settings = {
        dots:true,
        infinite:true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll:4,
        initialSlide:0,
        responsive :[
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
        ]
    }
  return (
<div className="slider-container">
      <Slider {...settings}>
         {media.map((item,index) => {
            <div>
                {item.type === 'image' ? (
                    <img
                       src={item.src}
                       alt={`Slide ${index+1}`}
                    />

                ): (
                    <video>
                        <source src={item.src} type='video/mp4'/>
                    </video>
                )}
            </div>
         })}
      </Slider>
    </div>
  )
}

export default SlickSLide
