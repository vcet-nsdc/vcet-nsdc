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

const Nvidia = () => {
    const nvidiaGallery = [
        { type: "image", src: "../img/events/nvidia/nvidia_1.webp" },
        { type: "image", src: "../img/events/nvidia/nvidia_2.webp" },
        { type: "image", src: "../img/events/nvidia/nvidia_3.webp" },
        { type: "image", src: "../img/events/nvidia/nvidia_4.webp" },
        { type: "image", src: "../img/events/nvidia/nvidia_5.webp" },
        { type: "image", src: "../img/events/nvidia/nvidia_6.webp" },
        { type: "image", src: "../img/events/nvidia/nvidia_7.webp" },
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
          Seminar on NVIDIA Jetson AI Edge Device
        </h1>

        <div id="tranding">
           <CoverflowCarousel media={nvidiaGallery}/>
        </div>

        <div className="event-container">
          <div className="event-header">
            <div className="event-timing">
              <p>
                <span>
                  📅 Date:
                  <span className="underline">30/08/2024</span>
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
                The seminar on NVIDIA Jetson AI Edge Device is designed to
                introduce participants to the NVIDIA Jetson AI Edge Devices and
                Software Stacks Overview. The seminar likely begins with an
                overview of the NVIDIA Jetson AI Edge device introduction,
                covering its architecture, key features, and various
                applications. Participants are then guided through live Jetson
                demo with Deepstream & Generative AI. The seminar includes
                hands- on sessions where attendees learn to use Deepstream &
                Generative AI efficiently also the NVIDIA Jetson device and
                Software Stacks. Additionally, participants may be involved in
                project development, integrating and communication modules to
                create functional applications. The NVIDIA Jetson devices with
                DeepStream and generative AI offers powerful edge computing for
                real-time video analytics. The primary purpose of the seminar is
                to equip participants with the practical skills and knowledge
                needed to work with Jetson Devices high performance processing,
                encouraging innovation and problem-solving in embedded systems
                and related fields. This experience can be particularly valuable
                for those looking to advance their careers in Generative AI and
                Software Stacks.
              </p>
            </div>
            <div className="event-highlights">
              <h2>Highlights</h2>
              <ul>
                <li>Event:NVIDIA Jetson AI Edge Device</li>
                <li>Date:30th August 2024</li>
                <li>Guest:Mr. Anil Sarode</li>
                <li>
                  Objectives : The objectives of the event are: <br />
                  1. To provide a comprehensive understanding of the
                  architecture, features, and applications of NVIDIA Jetson AI
                  Edge Device and NVIDIA Software Stacks. <br />
                  2. To encourage participants to apply their knowledge in
                  developing small projects with the help of Deepstream and
                  Generative AI.
                </li>
                <li>
                  Events: <br />
                  1. To explore NVIDIA Jetson AI Edge Device and Software
                  Stacks. <br />
                  2. To apply the knowledge gained in development of their
                  project using deep stream and generative AI.
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

export default Nvidia;
