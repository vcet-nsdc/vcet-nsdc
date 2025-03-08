import React, { useEffect } from "react";
import "./Landing.css";
import Navbar from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const IEvents = () => {
  useEffect(() => {
    // Function to apply the correct width to event images
    const applyEventImageWidth = () => {
      let eventsSections = document.getElementsByClassName("eventsSection");
      if (eventsSections.length > 0) {
        const width = getComputedStyle(eventsSections[0]).width;
        let eventImages = document.getElementsByClassName("eventImg");

        if (window.outerWidth <= 768) {
          // Adjust this breakpoint for mobile screens if needed
          for (let e of eventImages) {
            e.style.width = width;
          }
        } else {
          // Reset image widths for larger screens if necessary
          for (let e of eventImages) {
            e.style.width = ""; // Reset to default or auto
          }
        }
      }
    };

    // Initial run
    applyEventImageWidth();

    // Function to handle resize events
    const handleResize = () => {
      applyEventImageWidth();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Navbar />
      {/* Main content */}
      <main>
        <video
          id="bgVideo1"
          style={{ pointerEvents: "none" }}
          preload="true"
          autoPlay
          loop
          muted
        >
          <source src="../img/bg_video.mov" type="video/mp4" />
        </video>

        {/* Events Section */}
        <section className="events">
          <h1 className="text-center text-white text-decoration-underline p-5 text-4xl">
            Upcoming Events
          </h1>
          <div className="eventsSection row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
            <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
              <div className="position-relative">
                <img
                  className="eventImg"
                  src="../img/TechBlitz.webp"
                  alt="TechBlitz"
                />
                <div className="events-date">
                  <div className="font-size28">21</div>
                  <div className="font-size14">March</div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-sm-12">
              <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                  <Link
                    to="https://techblitz2025.netlify.app/"
                    className="text-theme-color evnt_title"
                  >
                    Techblitz Challenge 2025
                  </Link>
                </h3>
                <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                  <li>
                    <i className="fa fa-clock-o margin-10px-right"></i>
                    10:00 AM - 05:00 PM
                  </li>
                </ul>
                <div className="summary" id="summary">
                  <p className="collapse1" id="collapseSummary">
                    Techblitz redefines coding competitions by embracing AI
                    tools, breaking away from traditional restrictions.
                    Organized by NSDC, this event offers a platform to explore
                    Data Science, LLM integration, and UI/UX Designing.
                  </p>
                  <Link
                    className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                    id="readMoreBtn"
                    to="https://techblitz2025.netlify.app/"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="events">
          <h1 className="text-center text-white text-decoration-underline p-5 text-4xl">
            Events 2024-25
          </h1>
          <div className="container p-3">
            <div className="eventsSection row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img
                    className="eventImg"
                    src="../img/techx.webp"
                    alt="TechX"
                  />
                  <div className="events-date">
                    <div className="font-size28">27</div>
                    <div className="font-size14">Sept</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link
                      to="/productshowcase24"
                      className="text-theme-color evnt_title"
                    >
                      TechX - Product Showcase
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      10:00 AM - 05:00 PM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      TechX 2024, organized by the Department of Artificial
                      Intelligence and Data Science on September 27, 2024,
                      showcased innovative products and cutting-edge
                      technologies like the DJI AIR3S drone and blockchain
                      tools. Held in Labs 114 and 115, the event featured 35
                      students across 17 teams presenting solutions from
                      companies like Edba Academy and Tech Cryptors. Guided by
                      faculty coordinators, the event bridged academics and
                      industry, promoting technical expertise, presentation
                      skills, and professional growth through hands-on
                      experience and collaboration.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/productshowcase24"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="eventsSection  row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img
                    className="eventImg"
                    src="../img/codeofiestmain.webp"
                    alt="CodeOfiesta"
                  />
                  <div className="events-date">
                    <div className="font-size28">20</div>
                    <div className="font-size14">Sept</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link
                      to="/codeofiesta"
                      className="text-theme-color evnt_title"
                    >
                      CODE-O-FIESTA
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      10:00 AM - 05:00 PM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      Code-O-Fiesta 2024 was held on 20th September at
                      Vidyavardhini’s College of Engineering and Technology,
                      organized by the departments of Artificial Intelligence
                      and Data Science & Computer Science Engineering (Data
                      Science). The event was graced by dignitaries including
                      the chief guest, Mr. Ajit Kumar Singh, along with the
                      principal, Dr. Rakesh Himte, and other faculty heads. The
                      inauguration featured a traditional lamp lighting
                      ceremony, the "Saraswati Vandana" prayer, and speeches
                      from the guests, emphasizing the importance of such events
                      in fostering innovation and talent in technology. A
                      highlight was the presentation of the after-movie from the
                      previous year, which inspired the current participants.
                      The competition was divided into Healthcare and
                      Agriculture domains. Teams presented their solutions to a
                      jury, demonstrating their projects and algorithmic
                      approaches. After thorough evaluations, the winners were
                      announced and all participants received certificates from
                      the jury as recognition of their participation and the
                      event concluded with the National Anthem.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/Codeofiesta"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Start */}
            <div className="eventsSection  row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img
                    className="eventImg"
                    src="../img/logo_making.webp"
                    alt="Logo Making"
                  />
                  <div className="events-date">
                    <div className="font-size28">03</div>
                    <div className="font-size14">Sept</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link to="/logo" className="text-theme-color evnt_title">
                      LOGO MAKING COMPETITION
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      3:00 PM - 05:00 PM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      On September 3rd, 2024, a creative and engaging Logo
                      Making Competition was organized as part of the ICE3T
                      event. The competition centered around the "College Paper
                      Publication" theme, with participants tasked to design
                      logos that represented the diverse domains outlined on the
                      ICE3T website. These domains ranged from cutting-edge
                      technologies like Data Science, Cloud Computing, and IoT
                      to traditional fields such as Civil Engineering and
                      Indigenous Knowledge Systems, reflecting the broad
                      spectrum of research areas. The three- hour event allowed
                      participants ample time to ideate, sketch, and refine
                      their designs. During the final hour, a submission form
                      was circulated, enabling contestants to submit their
                      completed logos. Judging criteria emphasized creativity,
                      relevance to the theme, visual appeal, and the ability to
                      effectively convey the essence of academic publication and
                      research domains. The event showcased artistic innovation
                      and technical understanding, with students demonstrating
                      their design skills and ability to visually represent
                      complex academic themes. After the event, one outstanding
                      design was selected as the winner, highlighting the
                      participant's exceptional creativity and alignment with
                      the theme.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/logo"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* End */}
            {/* Start */}
            <div className="eventsSection row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img
                    className="eventImg"
                    src="../img/nvidia.webp"
                    alt="Nvidia Seminar"
                  />
                  <div className="events-date">
                    <div className="font-size28">30</div>
                    <div className="font-size14">August</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link to="/nvidia" className="text-theme-color evnt_title">
                      Seminar on NVIDIA Jetson AI Edge Device
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      10:30 AM - 12:30 PM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      The seminar on NVIDIA Jetson AI Edge Device organized by
                      our college is held on 30th August 2024 in association
                      with IETE. Mr. Anil Sarode explained the working and
                      functioning of NVIDIA jetson devices. Total attendees were
                      130. It is designed to introduce participants to the
                      NVIDIA Jetson AI Edge Devices and Software Stacks
                      Overview. The seminar likely begins with an overview of
                      the NVIDIA Jetson AI Edge device introduction, covering
                      its architecture, key features, and various applications.
                      Participants are then guided through live Jetson demo with
                      & Generative AI. Additionally, participants may be
                      involved in project development, integrating and
                      communication modules to create functional applications.
                      The NVIDIA Jetson devices with DeepStream and generative
                      AI offers powerful edge computing for real-time video The
                      primary purpose of the seminar is to equip participants
                      with the practical skills and knowledge needed to work
                      with Jetson Devices high performance processing,
                      encouraging innovation and problem- solving in embedded
                      systems and related fields. This experience can be
                      particularly valuable for those looking to advance their
                      careers in Generative AI and Software Stacks.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/nvidia"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* End */}
          </div>
          <h1 className="text-center text-white text-decoration-underline p-5 text-4xl">
            Events 2023-24
          </h1>
          <div className="container p-3">
            {/* Event Block */}
            {/* Start */}
            <div className="eventsSection row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img className="eventImg" src="../img/vmps.webp" alt="VNPS" />
                  <div className="events-date">
                    <div className="font-size28">06</div>
                    <div className="font-size14">April</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link to="/vnps" className="text-theme-color evnt_title">
                      VIDYAVARDHINI'S NATIONAL LEVEL PROJECT SHOWCASE (VNPS)
                      2024
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      10:00 AM - 05:00 PM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      On April 6, Yidypyardhini College of Engineering and
                      Technology (VCET) hosted a National Level Project Showcase
                      that featured various groundbreaking technologies. Track
                      3, in particular, highlighted advancements in Data
                      Science, Artificial Intelligence (AI), Machine Learning
                      (ML), Robotics, Deep Learning, and Natural Language
                      Processing (NLP). Projects under this track demonstrated
                      the impact of predictive analytics in Data Science,
                      innovative healthcare solutions with AI, and energy
                      optimization through ML. Robotics projects advanced
                      autonomous systems, while Deep Learning initiatives
                      excelled in image recognition. NLP projects improved
                      human-machine interaction, and Human-Computer Interaction
                      introduced user-centric designs. Additionally, Internet of
                      Things (IoT) projects showcased smart systems integration.
                      The event successfully celebrated and encouraged young
                      innovators, promoting collaboration and learning in
                      technology's dynamic landscape.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/vnps"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* End */}
            {/* Start */}
            <div className="eventsSection row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img
                    className="eventImg"
                    src="../img/OSCILLATION24.webp"
                    alt="Oscillation"
                  />
                  <div className="events-date">
                    <div className="font-size28">05</div>
                    <div className="font-size14">April</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link
                      to="/oscillation"
                      className="text-theme-color evnt_title"
                    >
                      OSCILLATIONS 2024 - Technical Paper Presentation.
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      10:00 AM - 05:00 PM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      On April 5th, 2024, OSCILLATIONS 2024, organized in
                      association with IETE Mumbai Centre, provided a vibrantl
                      platform for students to present their research. The event
                      began with an inaugural ceremony featuring esteemed
                      dignitaries, including the P!ipgipal and faculty, who set
                      a collaborative tone with traditional rituals and
                      speeches. Participants presented their work across six
                      diverse tracks, ranging from Mechanical System Design and
                      IoT to Data Science, Cloud Computing, Civil Engineering,
                      and Indigenous Knowledge Systems. Judging focused on
                      originality, technical content, and presentation skills,
                      leading to a prize distribution that celebrated
                      exceptional contributions. The success of OSCILLATIONS
                      2024, driven by the efforts of the organizing committee
                      and sponsors, facilitated dynamic exchanges of ideas,
                      fostering interdisciplinary interactions and inspiring
                      participants to pursue excellence in their fields.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/oscillation"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* End */}
            {/* Start */}
            <div className="eventsSection row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img
                    className="eventImg"
                    src="../img/TechBlitz.webp"
                    alt="TechBlitz"
                  />
                  <div className="events-date">
                    <div className="font-size28">15</div>
                    <div className="font-size14">March</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link
                      to="/techBlitz"
                      className="text-theme-color evnt_title"
                    >
                      TechBlitz Challenge
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      10:00 AM - 05:00 PM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      Techblitz redefines coding competitions by embracing AI
                      tools, breaking away from traditional restrictions.
                      Organized by NSDC, this event offers a platform to explore
                      Data Science, AI integration, and UI/UX Designing.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/techBlitz"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* End */}
            {/* Start */}
            <div className="eventsSection row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img
                    className="eventImg"
                    src="../img/PowerBI.webp"
                    alt="PowerBI"
                  />
                  <div className="events-date">
                    <div className="font-size28">01</div>
                    <div className="font-size14">March</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link to="/powerbi" className="text-theme-color evnt_title">
                      Expert Lecture on PowerBI
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      10:00 AM - 12:00 PM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      On March 1st, 2024, the National Students Data Corps
                      (NSDC) under the Department of Artificial Intelligence and
                      Data Science at Vidyavardhini\'s College of Engineering
                      and Technology (VCET) organized an expert lecture on Power
                      BI. The session was conducted by Ms. Isha Prakash, Data
                      Science Domain Head, Testriq.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/powerbi"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* End */}
            {/* Start */}
            <div className="eventsSection row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img
                    className="eventImg"
                    src="../img/techx.webp"
                    alt="TechX"
                  />
                  <div className="events-date">
                    <div className="font-size28">15</div>
                    <div className="font-size14">Sept</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link to="/product" className="text-theme-color evnt_title">
                      TechX - Product Showcase
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      10:00 AM - 05:00 PM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      Under the Department of Artificial Intelligence and Data
                      Science, the NSDC organized its inaugural event, the
                      Product Showcase \'Tech X\', inaugurated by Chief Guest
                      Akshay Bharambe sir. This event highlighted technical
                      products integrating machine learning, AI concepts, and
                      database management systems. Notable exhibits included
                      Parking Pal, an AI-powered parking management system, the
                      Android ecosystem showcasing innovative mobile
                      applications, Solomon CMS, a content management system
                      leveraging machine learning algorithms, and Binaural
                      Beats, an AI-driven music platform for cognitive
                      enhancement. This showcase not only demonstrated the
                      department\'s commitment to cutting-edge technology but
                      also provided a platform for students to showcase their
                      expertise and innovation in the field of AI and data
                      science.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/product"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* End */}
            {/* Start */}
            <div className="eventsSection row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img
                    className="eventImg"
                    src="../img/TechZette.webp"
                    alt="TechBlitz"
                  />
                  <div className="events-date">
                    <div className="font-size28">15</div>
                    <div className="font-size14">Sept</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link
                      to="/techzette"
                      className="text-theme-color evnt_title"
                    >
                      VCET TechZette – विसीईटी ज्ञानपत्र
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      10:00 AM - 11:00 AM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      The VCET TechZette – विसीईटी ज्ञानपत्र{" "}
                      <a target="_blank" href="https://www.techz.vcet.edu.in">
                        (www.techz.vcet.edu.in)
                      </a>
                      , a dynamic technical blog, serves as a digital hub for
                      insightful discourse, featuring a plethora of technical
                      articles contributed by esteemed faculty members, subject
                      matter experts, and the ingenious endeavors of students
                      ranging from the second to final year. In a distinctive
                      inauguration event under the Department of Artificial
                      Intelligence and Data Science at Vidyavardhini\'s College
                      of Engineering and Technology (VCET), with Chief Guest Mr.
                      Rahul Mhatre, the unveiling of this specialized platform
                      was a momentous occasion marked by eager anticipation and
                      dynamic exchange.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/techzette"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* End */}
            {/* Start */}
            <div className="eventsSection row align-items-center event-block no-gutters margin-40px-bottom widgets-dark typo-light bg-gradient">
              <div className="col-lg-5 col-sm-12" style={{ paddingLeft: 0 }}>
                <div className="position-relative">
                  <img
                    className="eventImg"
                    src="../img/inaug.webp"
                    alt="inaugration"
                  />
                  <div className="events-date">
                    <div className="font-size28">14</div>
                    <div className="font-size14">Sept</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="padding-50px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                  <h3 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                    <Link
                      to="/inaugration"
                      className="text-theme-color evnt_title"
                    >
                      NSDC Inaugration
                    </Link>
                  </h3>
                  <ul className="event-time margin-10px-bottom md-margin-5px-bottom">
                    <li>
                      <i className="fa fa-clock-o margin-10px-right"></i>
                      10:00 AM - 12:00 PM
                    </li>
                  </ul>
                  <div className="summary" id="summary">
                    <p className="collapse1" id="collapseSummary">
                      The National Student Data Corps (NSDC) stands as a beacon
                      of opportunity, ushering students into the vibrant world
                      of data science within a nurturing community. With a keen
                      eye towards empowering underserved institutions and
                      students, NSDC offers a transformative journey filled with
                      resources and support.
                    </p>
                    <Link
                      className="btn btn-outline-dark butn small margin-10px-top md-no-margin-top"
                      id="readMoreBtn"
                      to="/inaugration"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* End */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IEvents;
