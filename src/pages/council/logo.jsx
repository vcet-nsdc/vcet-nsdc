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
import CoverflowCarousel from "./CoverflowCarousel";

const LOGOMaking = () => {
    const logoGallery = [
        { type: "image", src: "../img/events/Logo/Logo_Making_1.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_2.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_3.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_4.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_5.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_6.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_7.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_8.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_9.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_10.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_11.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_12.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_13.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_14.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_15.webp" },
        { type: "image", src: "../img/events/Logo/Logo_Making_16.webp" },
        { type: "image", src: "../img/events/Logo/logo1_image.webp" },

    ]
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
          LOGO MAKING COMPETITION
        </h1>

        <div id="tranding">
          <CoverflowCarousel media={logoGallery}/>
        </div>

        <div className="event-container">
          <div className="event-header">
            <div className="event-timing">
              <p>
                <span>
                  📅 Date:
                  <span className="underline">03/09/2024</span>
                </span>
              </p>
              <p>
                <span>
                  ⏰ Time:
                  <span className="underline">3:00 PM - 5:00 PM</span>
                </span>
              </p>
            </div>
          </div>
          <div className="event-content">
            <div className="event-description">
              <h2>About</h2>
              <p>
                On September 3rd, 2024, a creative and engaging Logo Making
                Competition was organized as part of the ICE3T event. The
                competition centered around the "College Paper Publication"
                theme, with participants tasked to design logos that represented
                the diverse domains outlined on the ICE3T website. These domains
                ranged from cutting-edge technologies like Data Science, Cloud
                Computing, and IoT to traditional fields such as Civil
                Engineering and Indigenous Knowledge Systems, reflecting the
                broad spectrum of research areas. The three- hour event allowed
                participants ample time to ideate, sketch, and refine their
                designs. During the final hour, a submission form was
                circulated, enabling contestants to submit their completed
                logos. Judging criteria emphasized creativity, relevance to the
                theme, visual appeal, and the ability to effectively convey the
                essence of academic publication and research domains. The event
                showcased artistic innovation and technical understanding, with
                students demonstrating their design skills and ability to
                visually represent complex academic themes. After the event, one
                outstanding design was selected as the winner, highlighting the
                participant's exceptional creativity and alignment with the
                theme.
              </p>
            </div>
            <div className="event-highlights">
              <h2>Highlights</h2>
              <ul>
                <li>
                  Organized as part of the ICE3T event on September 3rd, 2024.
                </li>
                <li>Focused on the theme "College Paper Publication."</li>
                <li>
                  Participants designed logos representing diverse domains
                  listed on the ICE3T website.
                </li>
                <li>
                  Domains included Data Science, Cloud Computing, IoT, Civil
                  Engineering, and Indigenous Knowledge Systems.
                </li>
                <li>
                  The competition lasted for three hours, allowing time for
                  ideation, sketching, and refining.
                </li>
                <li>
                  A submission form was circulated during the final hour for
                  participants to submit their designs.
                </li>
                <li>
                  Judging criteria: creativity, relevance to the theme, visual
                  appeal, and effective communication of academic publication
                  and research domains.
                </li>
                <li>
                  The event highlighted artistic innovation and technical
                  understanding in logo design.
                </li>
                <li>
                  One outstanding design was selected as the winner for its
                  exceptional creativity and alignment with the theme.
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

export default LOGOMaking;
