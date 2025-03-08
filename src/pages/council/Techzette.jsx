import React, { lazy } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "./Inaug.css";
import "./event.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay, Zoom } from "swiper/modules";

import Navbar from "./Nav";
import Footer from "./Footer";
import "./techzette.css";
import CoverflowCarousel from "./CoverflowCarousel";

const Techzette = () => {
   const techZetteGallery = [
    { type: "video", src: "../img/events/TechZette/TechZette_1.mov" },
    { type: "image", src: "../img/events/TechZette/TechZette_2.webp" },
    { type: "image", src: "../img/events/TechZette/TechZette_3.webp" },
    { type: "image", src: "../img/events/TechZette/TechZette_4.webp" },
    { type: "image", src: "../img/events/TechZette/TechZette_5.webp" },
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
          NSDC - TECHZETTE
        </h1>

        <div id="tranding">
            <CoverflowCarousel media={techZetteGallery}/>

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
                The VCET TechZette - विसीईटी ज्ञानपत्रa
                <a target="_blank" href="https://www.techz.vcet.edu.in">
                  (www.techz.vcet.edu.in)
                </a>
                , a dynamic technical blog, serves as a digital hub for
                insightful discourse, featuring a plethora of technical articles
                contributed by esteemed faculty members, subject matter experts,
                and the ingenious endeavors of students ranging from the second
                to final year. In a distinctive inauguration event under the
                Department of Artificial Intelligence and Data Science at
                Vidyavardhini's College of Engineering and Technology (VCET),
                with Chief Guest Mr. Rahul Mhatre, the unveiling of this
                specialized platform was a momentous occasion marked by eager
                anticipation and dynamic exchange. Students, faculty, and
                distinguished guests converged to herald the introduction of
                this innovative technical blog. Through TechZette, contributors
                embark on a journey to share their technical expertise,
                pioneering insights, and actively engage with the broader
                community on intricate topics encompassing AI, data science, and
                beyond. This event underscored the college's unwavering
                commitment to fostering a culture of collaborative learning and
                extending intellectual discourse beyond conventional boundaries.
                As the inaugural posts went live, it marked the commencement of
                an enriching journey, poised to propel understanding and
                catalyze further exploration in the ever-evolving realms of
                technology and innovation.
              </p>
            </div>
            <div className="event-highlights">
              <h2>Highlights</h2>
              <ul>
                <li>
                  Event: Inauguration of VCET TechZette - विसीईटी ज्ञानपत्र
                  <a target="_blank" href="https://www.techz.vcet.edu.in">
                    (www.techz.vcet.edu.in)
                  </a>
                </li>
                <li>Chief Guest: Mr. Rahul Mhatre</li>
                <li>
                  Key Highlights:
                  <ul>
                    <li>
                      Launched a dynamic technical blog featuring technical
                      articles from faculty, experts, and students
                    </li>
                    <li>
                      Provides a platform for sharing expertise, insights, and
                      fostering collaborative learning
                    </li>
                    <li>
                      Covers topics in AI, data science, and other technical
                      areas
                    </li>
                    <li>
                      Marks the college's commitment to promoting intellectual
                      discourse and exploration of technology
                    </li>
                    <li>
                      Inaugural posts went live, commencing an enriching journey
                      into the realms of innovation
                    </li>
                  </ul>
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

export default Techzette;
