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

const Codeofista = () => {
  const logoGallery = [
    { type: "image", src: "../img/events/codeOfista/codeofista1.webp" },
    { type: "image", src: "./img/events/codeOfista/codeofista2.webp" },
    { type: "image", src: "./img/events/codeOfista/codeofista3.webp" },
    { type: "image", src: "../img/events/codeOfista/codeofista4.webp" },
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
          CODE-O-FIESTA
        </h1>

        <div id="tranding">
          <CoverflowCarousel media={logoGallery} />
        </div>

        <div className="event-container">
          <div className="event-header">
            <div className="event-timing">
              <p>
                <span>
                  📅 Date:
                  <span className="underline">20/09/2024</span>
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
                Code-O-Fiesta 2024 was held on 20th September at Vidyavardhini’s
                College of Engineering and Technology, organized by the
                departments of Artificial Intelligence and Data Science &
                Computer Science Engineering (Data Science). The event was
                graced by dignitaries including the chief guest, Mr. Ajit Kumar
                Singh, along with the principal, Dr. Rakesh Himte, and other
                faculty heads. The inauguration featured a traditional lamp
                lighting ceremony, the "Saraswati Vandana" prayer, and speeches
                from the guests, emphasizing the importance of such events in
                fostering innovation and talent in technology. A highlight was
                the presentation of the after-movie from the previous year,
                which inspired the current participants. The competition was
                divided into Healthcare and Agriculture domains. Teams presented
                their solutions to a jury, demonstrating their projects and
                algorithmic approaches. After thorough evaluations, the winners
                were announced and all participants received certificates from
                the jury as recognition of their participation and the event
                concluded with the National Anthem.
              </p>
            </div>
            <div className="event-highlights">
              <h2>Highlights</h2>
              <ul>
                <li>
                  <strong>Event Date</strong>: Held on September 20th, 2024, at
                  Vidyavardhini’s College of Engineering and Technology.
                </li>
                <li>
                  <strong>Organizers</strong>: Department of Artificial
                  Intelligence & Data Science and Computer Science Engineering
                  (Data Science).
                </li>
                <li>
                  <strong>Guests</strong>: The event was graced by dignitaries,
                  including the chief guest, Mr. Ajit Kumar Singh, college
                  principal Dr. Rakesh Himte, and other department heads.
                </li>
                <li>
                  <strong>Inauguration</strong>: The event started with a
                  traditional lamp lighting ceremony, followed by a melodious
                  "Saraswati Vandana."
                </li>
                <li>
                  <strong>Keynote</strong>: The importance of events like
                  Code-O-Fiesta was highlighted in speeches by the chief guest
                  and faculty members.
                </li>
                <li>
                  <strong>Competition Structure</strong>: Participants were
                  divided into domains—Healthcare and Agriculture—based on
                  selected problem statements.
                </li>
                <li>
                  <strong>Jury Round</strong>: Teams presented their solutions
                  to a jury, showcasing their ideas and algorithmic approaches.
                </li>
                <li>
                  <strong>Final Round</strong>: Selected teams made
                  presentations with live demos of websites or apps in front of
                  judges and an audience.
                </li>
                <li>
                  <strong>Awards</strong>: Winners received the Code-O-Fiesta
                  trophy and certificates, with all participants receiving
                  certificates of recognition.
                </li>
                <li>
                  <strong>Conclusion</strong>: The event ended with the National
                  Anthem.
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

export default Codeofista;
