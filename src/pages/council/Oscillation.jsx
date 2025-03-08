import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "./Inaug.css";
import "./event.css";
import Navbar from "./Nav";
import Footer from "./Footer";
// import PhotoSwiper from "./EventSwiper";
// import SlickSLide from "./SlickSLide";
import CoverflowCarousel from "./CoverflowCarousel"

const Oscillation = () => {
  const osiGallery = [
    { type: "image", src: "../img/events/oscillation/osc1.webp" },
    { type: "image", src: "../img/events/oscillation/osc2.webp" },
    { type: "image", src: "../img/events/oscillation/osc3.webp" },
    { type: "image", src: "../img/events/oscillation/osc4.webp" },
    { type: "image", src: "../img/events/oscillation/osc5.webp" },
    { type: "image", src: "../img/events/oscillation/osc6.webp" },
    { type: "image", src: "../img/events/oscillation/osc7.webp" },
    { type: "image", src: "../img/events/oscillation/osc8.webp" },
    { type: "image", src: "../img/events/oscillation/osc9.webp" },
    { type: "image", src: "../img/events/oscillation/osc10.webp" },
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
          OSCILLATION'S - 2024
        </h1>

        <div id="tranding">
          {/*  */}
          <CoverflowCarousel media={osiGallery} />
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
                OSCILLATIONS 2024, held on April 5th in collaboration with IETE
                Mumbai Centre, was a prestigious technical paper presentation
                event that offered students a platform to showcase their
                research, skills, and expertise. The event featured six diverse
                tracks, including mechanical systems, AI, IoT, civil
                engineering, and Indigenous Knowledge Systems (IKS). The
                inauguration was marked by traditional ceremonies, including the
                lighting of the ceremonial lamp and Saraswati Vandana, attended
                by dignitaries, faculty, and participants. Students presented
                their papers, evaluated on criteria such as originality,
                technical content, and presentation. The event concluded with a
                prize distribution, honoring winners across each track.
                OSCILLATIONS 2024 encouraged interdisciplinary knowledge
                exchange, fostering innovation and critical thinking, while
                inspiring participants to continue pushing the boundaries of
                research and technology to tackle real-world challenges.
              </p>
            </div>
            <div className="event-highlights">
              <h2>Highlights</h2>
              <ul>
                <li>
                  Event: OSCILLATIONS 2024 – Technical Paper Presentation.
                </li>
                <li>Date: April 5th, 2024.</li>
                <li>Organizer: VCET in association with IETE Mumbai Centre.</li>
                <li>
                  Inaugural Ceremony: Attended by dignitaries, faculty, and
                  participants. Traditional rituals including the lighting of
                  the lamp and Saraswati Vandana. Words of wisdom from
                  dignitaries.
                </li>
                <li>
                  Six Presentation Tracks: 1. Mechanical System Design,
                  RenewableEnergy, Electric Vehicles, AI & ML applications in
                  Mechanical Systems.
                  <br />
                  2. IoT, Signal Processing, Wireless Communication, VLSI,
                  Automation, Biomedical Instrumentation.
                  <br />
                  3.Data Science, AI, Machine Learning, Robotics, Deep Learning,
                  Natural Language Processing (NLP). <br />
                  4. Cloud Computing, Big Data, Cybersecurity, Blockchain, Web &
                  Mobile Applications.
                  <br />
                  5. Civil Engineering: Concrete Technology, Structural &
                  Geotechnical Engineering, Environmental Engineering, etc.
                  <br />
                  6. Indigenous Knowledge Systems (IKS): Integration with modern
                  engineering and sciences.
                </li>
                <li>
                  Judging Criteria: Originality, technical content, presentation
                  skills.
                </li>
                <li>
                  Event Outcome: <br />
                  1. Fostering interdisciplinary collaboration. <br />
                  2.Encouraging innovation and critical thinking. <br />
                  3.Promoting real-world problem-solving.
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

export default Oscillation;
