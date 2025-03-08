import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  EffectCoverflow,
  Pagination,
  Autoplay,
  Zoom,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "./Inaug.css";
import "./event.css";
import { Fancybox } from "@fancyapps/ui";
import Navbar from "./Nav";
import Footer from "./Footer";
import PhotoSwiper from "./EventSwiper";
import CoverflowCarousel from "./CoverflowCarousel";

const VNPS = () => {
  const vnpsGallery = [
    { type: "image", src: "../img/events/vnps/vnps1.webp" },
    { type: "image", src: "../img/events/vnps/vnps2.webp" },
    { type: "image", src: "../img/events/vnps/vnps3.jpg" },
    { type: "image", src: "../img/events/vnps/vnps4.webp" },
    { type: "image", src: "../img/events/vnps/vnps5.webp" },
    { type: "image", src: "../img/events/vnps/vnps6.webp" },
    { type: "image", src: "../img/events/vnps/vnps7.webp" },
    { type: "image", src: "../img/events/vnps/vnps8.webp" },
    { type: "image", src: "../img/events/vnps/vnps9.webp" },
    { type: "image", src: "../img/events/vnps/vnps10.webp" },
  ];
//   React.useEffect(() => {
//     Fancybox.bind("[data-fancybox]", {
//       Thumbs: false,
//       Toolbar: {
//         enabled: false,
//       },
//       on: {
//         init: () => {
//           const swiper = document.querySelector(".swiper").swiper;
//           swiper.autoplay.pause();
//         },
//         done: () => {
//           const swiper = document.querySelector(".swiper").swiper;
//           const fancybox = Fancybox.getInstance();
//           const index = fancybox.getSlide().index;
//           swiper.slideTo(index);
//           swiper.autoplay.pause();
//         },
//         destroy: () => {
//           const swiper = document.querySelector(".swiper").swiper;
//           swiper.autoplay.run();
//         },
//       },
//     });

//     return () => {
//       Fancybox.destroy();
//     };
//   }, []);

  return (
    <>
      <main>
        <video
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
          autoPlay
          loop
          muted
        >
          <source src="../img/bg_video.mov" type="video/mp4" />
        </video>

        <header>
          <Navbar />
        </header>

        <h1 className="text-center text-white text-decoration-underline p-5 text-4xl">
          VNPS
        </h1>

        <div id="tranding">
          <CoverflowCarousel media={vnpsGallery} />
        </div>

        <div className="event-container">
          <div className="event-header">
            <div className="event-timing">
              <p>
                <span>
                  📅 Date:
                  <span className="underline">14/09/2023</span>
                </span>
              </p>
              <p>
                <span>
                  ⏰ Time:
                  <span className="underline">10:30 AM - 12:30 PM</span>
                </span>
              </p>
            </div>
          </div>
          <div className="event-content">
            <div className="event-description">
              <h2>About</h2>
              <p>
                On April 6, Vidyavardhini College of Engineering and Technology
                (VCET) hosted a National Level Project Showcase, providing
                students a platform to present innovative projects across
                various technological domains. Track 3 featured cutting-edge
                technologies, including Data Science, Artificial Intelligence,
                Machine Learning, Robotics, Deep Learning, and Natural Language
                Processing (NLP). Projects demonstrated advancements in
                predictive analytics, AI in healthcare, energy optimization,
                autonomous robotics, image recognition, and human-machine
                interaction. The event successfully showcased the transformative
                potential of emerging technologies, fostering collaboration and
                knowledge exchange among students and industry experts.
              </p>
            </div>
            <div className="event-highlights">
              <h2>Highlights</h2>
              <ul>
                <li>
                  {" "}
                  Event:Vidyavardhini's National Level Project Showacase(VNPS)
                </li>
                <li>Event Date: April 6, 2024.</li>
                <li>
                  Organizer: Vidyavardhini College of Engineering and Technology
                  (VCET).
                </li>
                <li>
                  Purpose: To provide a platform for students to showcase
                  innovative projects across various technological domains.
                </li>
                <li>
                  Focus of Track 3: Data Science, Artificial Intelligence (AI),
                  Machine Learning (ML), Robotics, Deep Learning, Natural
                  Language Processing (NLP).
                </li>
                <li>
                  Event Outcome: 1.Successful platform for innovation and
                  knowledge exchange.
                  <br />
                  2.Fostered collaboration and exploration in emerging
                  technologies.
                  <br />
                  3.Addressed real-world challenges across various sectors.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default VNPS;
