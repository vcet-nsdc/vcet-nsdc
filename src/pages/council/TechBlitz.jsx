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

const TechBlitz = () => {
    const TechBlitzGallery = [
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_1.webp" },
        { type: "video", src: "../img/events/TechBlitz/TechBlitz_img_1.mp4" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_2.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_3.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_4.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_5.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_6.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_7.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_8.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_9.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_10.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_11.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_12.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_13.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_14.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_15.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_16.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_17.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_18.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_19.webp" },
        { type: "image", src: "../img/events/TechBlitz/TechBlitz_img_20.webp" },

    ]
  React.useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      Thumbs: false,
      Toolbar: {
        enabled: false,
      },
      on: {
        init: () => {
          const swiper = document.querySelector(".swiper").swiper;
          swiper.autoplay.pause();
        },
        done: () => {
          const swiper = document.querySelector(".swiper").swiper;
          const fancybox = Fancybox.getInstance();
          const index = fancybox.getSlide().index;
          swiper.slideTo(index);
          swiper.autoplay.pause();
        },
        destroy: () => {
          const swiper = document.querySelector(".swiper").swiper;
          swiper.autoplay.run();
        },
      },
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <>
      <div className="icon-bar">
        <a target="_blank" href="mailto:nsdc@vcet.edu.in" className="gmail">
          <i className="fa fa-envelope-o" aria-hidden="true"></i>
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/vcet-nsdc"
          className="linkedin"
        >
          <i className="fa fa-linkedin"></i>
        </a>
        <a
          title="instagram"
          target="_blank"
          href="https://www.instagram.com/nsdc.vcet"
        >
          <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>
      </div>

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
          NSDC - TECHBLITZ
        </h1>

        <div id="tranding">
         <CoverflowCarousel media={TechBlitzGallery}/>
        </div>

        <div className="event-container">
          <div className="event-header">
            <div className="event-timing">
              <p>
                <span>
                  📅 Date:
                  <span className="underline">15/03/2024</span>
                </span>
              </p>
              <p>
                <span>
                  ⏰ Time:
                  <span className="underline">10:00 AM - 5:00 PM</span>
                </span>
              </p>
            </div>
          </div>
          <div className="event-content">
            <div className="event-description">
              <h2>About</h2>
              <p>
                The "TechBlitz" challenge event organized by the National
                Students Data Corps (NSDC) at Vidyavardhini's College of
                Engineering and Technology (VCET) on March 15th, 2024, marked a
                significant milestone in the intersection of technology and
                education. Under the auspices of the Department of Artificial
                Intelligence and Data Science, the event showcased the prowess
                of budding technologists across three pivotal domains: web
                development using AI, UI/UX design, and data science using AI.
              </p>
              <p>
                With an emphasis on innovation and collaboration, students from
                diverse backgrounds converged to present their projects, each
                reflecting a blend of technical ingenuity and creative flair.
                The event was inaugurated by VCET's esteemed Principal, Mr.
                Harish Vankudre, and the Dean of Academic Affairs, Mr. Vikas
                Gupta, underscoring the institution's commitment to fostering
                technological excellence.
              </p>
              <p>
                Expert judges, including Yogesh Pingle and Raunak Joshi for data
                science, Sneha Yadav and Sneha Mhatre for UI/UX design, and Neha
                Raut, Ichhanshu Jaiswal, Kshitija Gharat, and Smita Jawale for
                web development using AI, meticulously evaluated the
                submissions, recognizing the most innovative and impactful
                projects.
              </p>
              <p>
                Winners included "gaavwale" in web development, "ui/ix unicorns"
                in UI/UX design, and "team code create" in data science.
                Runner-ups were "webweavers" for web development, "creative
                coders" for UI/UX design, and "team TCET" for data science using
                AI. emerged triumphant, showcasing the transformative potential
                of AI-driven technologies in shaping the digital landscape.
                "TechBlitz" not only celebrated academic excellence but also
                served as a testament to the collaborative spirit and ingenuity
                of the next generation of technologists.
              </p>
            </div>
            <div class="event-highlights">
              <h2>Highlights</h2>
              <ul>
                <li>Event: TechBlitz Challenge Event</li>
                <li>Hosted by: National Students Data Corp (NSDC)</li>
                <li>
                  Venue: Vidyavardhini's College of Engineering and Technology
                  (VCET)
                </li>
                <li>Date: March 15th, 2024</li>
                <li>
                  Key Highlights:
                  <ul>
                    <li>
                      Showcased prowess of budding technologists in three
                      domains:
                      <ul>
                        <li>Web development using AI</li>
                        <li>UI/UX design</li>
                        <li>Data science using AI</li>
                      </ul>
                    </li>
                    <li>Emphasis on innovation and collaboration</li>
                    <li>
                      Organized by the Department of Artificial Intelligence and
                      Data Science
                    </li>
                  </ul>
                </li>
                <li>
                  Inauguration:
                  <ul>
                    <li>By VCET Principal, Mr. Harish Vankudre</li>
                    <li>By Dean of Academic Affairs, Mr. Vikas Gupta</li>
                  </ul>
                </li>
                <li>
                  Expert Judges:
                  <ul>
                    <li>
                      Data Science Challenge:
                      <ul>
                        <li>Yogesh Pingle</li>
                        <li>Raunak Joshi</li>
                      </ul>
                    </li>
                    <li>
                      UI/UX Design Challenge:
                      <ul>
                        <li>Sneha Yadav</li>
                        <li>Sneha Mhatre</li>
                      </ul>
                    </li>
                    <li>
                      AI-based Web Development Challenge:
                      <ul>
                        <li>Neha Raut</li>
                        <li>Ichhanshu Jaiswal</li>
                        <li>Kshitija Gharat</li>
                        <li>Smita Jawale</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Winners:
                  <ul>
                    <li>Web Development: "gaavwale"</li>
                    <li>UI/UX Design: "ui/ix unicorns"</li>
                    <li>Data Science: "team code create"</li>
                  </ul>
                </li>
                <li>
                  Runners-up:
                  <ul>
                    <li>Web Development: "webweavers"</li>
                    <li>UI/UX Design: "creative coders"</li>
                    <li>Data Science using AI: "team TCET"</li>
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

export default TechBlitz;
