
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./CoverflowCarousel.css"; // For custom styles

// function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", right: "10px" }} // Adjust position
//         onClick={onClick}
//       />
//     );
//   }

//   // Custom Prev Arrow
//   function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", left: "10px" }} // Adjust position
//         onClick={onClick}
//       />
//     );
//   }

// const CoverflowCarousel = ({media}) => {
//   const settings = {

//     className: "center",
//     centerMode: true,
//     centerPadding: "80px",
//     slidesToShow: 3, // Display 3 slides on large screens
//     infinite: true,
//     speed: 3000,
//     autoplay: true,
//     autoplaySpeed: 13000,
//     focusOnSelect: true,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1440, // Desktop
//         settings: {
//           slidesToShow: 3,
//           centerPadding: "60px",

//         },
//       },
//       {
//         breakpoint: 1024, // Laptops and tablets
//         settings: {
//           slidesToShow: 2,
//           centerPadding: "80px",
//         },
//       },
//       {
//         breakpoint: 768, // Mobile devices
//         settings: {
//           slidesToShow: 1,
//           centerPadding: "20px",
//           className:"center",
//           centerMode: true,
//           speed:500,

//         },
//       },
//     ],
//   };

//   return (
//     <Slider {...settings}>
//       {media.map((item, index) => (
//         <div key={index}
//         className="carousel-item "
//         >
//           {item.type === "image" ? (
//             <img src={item.src} alt={item.alt} />
//           ) : (
//             <video controls>
//               <source src={item.src} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default CoverflowCarousel;


import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CoverflowCarousel.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: "10px" }}
        onClick={onClick}
      />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "10px" }}
        onClick={onClick}
      />
    );
}

const CoverflowCarousel = ({ media }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "80px",
    slidesToShow: 3,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 13000,
    focusOnSelect: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1440, // Desktop
        settings: {
          slidesToShow: 3,
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
          className: "center",
          centerMode: true,
          speed: 500,
        },
      },
    ],
  };

  const handleItemClick = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNextItem = () => {
    const nextIndex = (selectedIndex + 1) % media.length;
    setSelectedItem(media[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const handlePrevItem = () => {
    const prevIndex = (selectedIndex - 1 + media.length) % media.length;
    setSelectedItem(media[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  return (
    <div className="relative z-10">
      <Slider {...settings}>
        {media.map((item, index) => (
          <div
            key={index}
            className="carousel-item"
            onClick={() => handleItemClick(item, index)}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-64 object-cover"
              />
            ) : (
              <video controls className="w-full h-64 object-cover">
                <source src={item.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </Slider>

      {isModalOpen && selectedItem && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-transparent rounded-lg shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-[100] text-white bg-black/50 rounded-full p-2 hover:bg-black/75"
              onClick={handleCloseModal}
            >
              <X size={24} />
            </button>

            <div className="relative flex-grow flex items-center justify-center p-4">
              <button
                className="absolute left-0 z-[100] bg-black/50 text-white rounded-full p-2 hover:bg-black/75 m-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevItem();
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <div className="w-full h-full flex items-center justify-center">
                {selectedItem.type === "image" ? (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.alt}
                    className="w-[650px] h-[500px] object-contain"
                  />
                ) : (
                  <video
                    controls
                    autoPlay
                    className="w-[600px] h-[400px] object-cover"
                  >
                    <source src={selectedItem.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              <button
                className="absolute right-0 z-[100] bg-black/50 text-white rounded-full p-2 hover:bg-black/75 m-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextItem();
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverflowCarousel;
