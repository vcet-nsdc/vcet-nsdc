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

const Productshowcase24 = () => {
    const Productshowcase24Gallery = [
     
        { type: "image", src: "../img/events/products24/121.webp" },
        { type: "image", src: "../img/events/products24/122.webp" },
        { type: "image", src: "../img/events/products24/123.webp" },
        { type: "image", src: "../img/events/products24/124.webp" },
        { type: "image", src: "../img/events/products24/125.webp" },
        { type: "image", src: "../img/events/products24/126.webp" },
        { type: "image", src: "../img/events/products24/127.webp" },
        { type: "image", src: "../img/events/products24/128.webp" },


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
          NSDC - PRODUCTSHOWCASE
        </h1>

        <div id="tranding">
         <CoverflowCarousel media={Productshowcase24Gallery}/>
        </div>

        <div className="event-container">
          <div className="event-header">
            <div className="event-timing">
              <p>
                <span>
                  📅 Date:
                  <span className="underline">27/09/2024</span>
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
              TechX 2024, a one-day Product Showcase event organized by the Department of Artificial Intelligence and Data Science, was held on September 27, 2024, in Labs 114 and 115. Guided by faculty coordinators Prof. Sejal Dmello, Prof. Bhavika Gharat, and Prof. Neha Raut, the event aimed to bridge academic learning with industry exposure.
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
              TechX provided a platform for 35 students across 17 teams to exhibit innovative products from leading companies like Edba Academy, Tech Cryptors, and DataMango. Products included cutting-edge technologies like the DJI AIR3S drone, advanced graphics cards, and blockchain-based tools.
              </p>
              <p>
The event encouraged students to enhance technical expertise, presentation skills, and professional communication through hands-on engagement with industry-grade tools. With active participation from industries and students, TechX fostered collaboration and skill development, promoting holistic personal and professional growth.







              </p>
            </div>
            <div class="event-highlights">
  <h2>Highlights</h2>
  <ul>
    <li>Event: TechX Product Showcase 2024</li>
    <li>Hosted by: Department of Artificial Intelligence and Data Science</li>
    <li>
      Venue: Labs 114 and 115, Vidyavardhini's College of Engineering and
      Technology (VCET)
    </li>
    <li>Date: 27th September, 2024</li>
    <li>
      Key Highlights:
      <ul>
        <li>
          Showcased innovative products from leading companies:
          <ul>
            <li>Edba Academy</li>
            <li>Tech Cryptors</li>
            <li>DataMango</li>
            <li>Zaplet</li>
            <li>VM Protect</li>
            <li>Cosmic Spirit</li>
          </ul>
        </li>
        <li>Products included cutting-edge technologies:</li>
        <ul>
          <li>DJI AIR3S drone</li>
          <li>Advanced graphics cards (3090 & 3080)</li>
          <li>Wireless video transmission systems</li>
          <li>Blockchain-based inventory management tools</li>
        </ul>
        <li>
          Aimed to enhance students' technical expertise, presentation skills,
          and professional communication
        </li>
        <li>Promoted collaboration and holistic growth</li>
      </ul>
    </li>
    <li>
      Faculty Coordinators:
      <ul>
        <li>Prof. Sejal Dmello</li>
        <li>Prof. Bhavika Gharat</li>
        <li>Prof. Neha Raut</li>
      </ul>
    </li>
    <li>
      Participants:
      <ul>
        <li>35 students grouped into 17 teams</li>
        <li>Showcased products and engaged with visitors</li>
      </ul>
    </li>
    <li>
      Example Product Demonstrations:
      <ul>
        <li>
          Sharp Productions: DJI AIR3S drone and high-end graphics cards
        </li>
        <li>MLSC: Products from Microsoft Power BI</li>
        <li>Edba: Products from Edquest</li>
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

export default Productshowcase24;
