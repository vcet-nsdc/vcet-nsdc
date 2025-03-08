import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow, Zoom } from 'swiper/modules';
import { Fancybox } from "@fancyapps/ui";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/zoom';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import './product.css';

const PhotoSwiper = ({ media }) => {
    useEffect(() => {
        const setupFancybox = () => {
            const isMobile = window.innerWidth <= 768;
            Fancybox.bind("[data-fancybox]", {
                Thumbs: false,
                Toolbar: {
                    display: isMobile ? ["close"] : ["zoom", "slideshow", "fullscreen", "download", "close"],
                },
                Image: { zoom: !isMobile },
                fullScreen: { autoStart: !isMobile },
                on: {
                    init: (fancybox) => {
                        const swiper = document.querySelector(".swiper")?.swiper;
                        swiper?.autoplay?.pause();
                    },
                    done: (fancybox) => {
                        const swiper = document.querySelector(".swiper")?.swiper;
                        const index = fancybox.getSlide().index;
                        swiper?.slideTo(index);
                        swiper?.autoplay?.pause();
                    },
                    destroy: () => {
                        const swiper = document.querySelector(".swiper")?.swiper;
                        swiper?.autoplay?.start();
                    },
                    "Carousel.change": (fancybox, carousel, to) => {
                        const swiper = document.querySelector(".swiper")?.swiper;
                        swiper?.slideTo(to);
                    },
                },
            });
        };

        setupFancybox();
        window.addEventListener('resize', setupFancybox);

        return () => {
            Fancybox.destroy();
            window.removeEventListener('resize', setupFancybox);
        };
    }, []);

    return (
        <div className="main-swiper">
            <Swiper
                modules={[Navigation, EffectCoverflow, Pagination, Zoom, Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                observer={true}
                observeParents={true}
                zoom={true}
                autoplay={{
                    delay: 13000,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                }}
                lazy={{
                    loadPrevNext: true,
                    loadPrevNextAmount: 3,
                }}
                breakpoints={{
                    320: { slidesPerView: 1, width:320},
                    640: { slidesPerView: 1, width: 640 },
                    768: { slidesPerView: 2, width: 768 },
                    1024: { slidesPerView: 3 },
                }}

                className='mySwipper'
            >
                {...media.map((item,index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                        <div className="main-slide">
                            {item.type === 'image' ? (
                                <img
                                    data-fancybox="gallery"
                                    src={item.src}
                                    alt={`Slide ${index + 1}`}
                                    className="img-slide"
                                    loading="lazy"
                                />
                            ) : (
                                <video controls className="video-slide" loading="lazy">
                                    <source src={item.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PhotoSwiper;



