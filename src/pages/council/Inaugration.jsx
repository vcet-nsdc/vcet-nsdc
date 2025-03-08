import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "./Inaug.css";
import "./event.css";
import Navbar from "./Nav";
import Footer from "./Footer";
import PhotoSwiper from "./EventSwiper";
import CoverflowCarousel from "./CoverflowCarousel";


const NSDCInauguration = () => {
  const InaugGallery = [
    { type: "video", src: "../img/events/inaugration/inaug_1.mov" },
    { type: "image", src: "../img/events/inaugration/inaug_2.webp" },
    { type: "image", src: "../img/events/inaugration/inaug_3.webp" },
    { type: "image", src: "../img/events/inaugration/inaug_4.webp" },
    { type: "image", src: "../img/events/inaugration/inaug_5.webp" },
    { type: "image", src: "../img/events/inaugration/inaug_6.webp" },
    { type: "image", src: "../img/events/inaugration/inaug_7.webp" },
    { type: "image", src: "../img/events/inaugration/inaug_8.webp" },
    { type: "image", src: "../img/events/inaugration/inaug_9.webp" },
    { type: "image", src: "../img/events/inaugration/inaug_10.webp"},
  ];

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
          NSDC - INAUGURATION
        </h1>

        <div id="tranding">
          <CoverflowCarousel media={InaugGallery} />
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
                The Inauguration of the National Students Data Corps (NSDC)
                student chapter under the Department of Artificial Intelligence
                and Data Science at Vidyavardhini's College of Engineering and
                Technology was a momentous occasion marked by excitement and
                promise. Chief Guest Mr. Rahul Mhatre along with faculty
                members, guests, as well as Students gathered to witness the
                unveiling of this pioneering initiative aimed at harnessing the
                power of data for transformative change. With the grand reveal,
                a new era of collaboration and exploration dawned, as our
                students embarked on a journey to leverage data-driven insights
                for the betterment of society. The event resonated with
                enthusiasm and determination, underscoring our college's
                unwavering dedication to nurturing future leaders equipped with
                the skills and knowledge to thrive in an increasingly
                data-centric world.
              </p>
            </div>
            <div className="event-highlights">
              <h2>Highlights</h2>
              <ul>
                <li>Inaugural Event: Unveiling NSDC at VCET</li>
                <li>
                  Guests: Mr. Rahul Mhatre, Senior Manager at Software AG, Dr.
                  Tatwadarshi Nagarhalli (HOD), Dr. Uday Aswalekar (Principal),
                  Dr. Vikas Gupta (Dean of Academics)
                </li>
                <li>
                  NSDC Inauguration: Logo Unveiling & Informative Video
                  Presentation
                </li>
                <li>Insights from Chief Guest Mr. Rahul Mhatre</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default NSDCInauguration;
