import React from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div>
     <footer id="footer" className="footer-1">
        <div className="main-footer widgets-dark typo-light">
          <div className="container">
            <div className="row">
              <motion.div className="col-xs-12 col-sm-6 col-md-3"

initial={{
    opacity: 0,

    x: 0,
}}
whileInView={{
    opacity: 1,

    x: 0,
    transition: {
        delay: 0.3,
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.5,
    },
}}
viewport={{ once: true }}
              >
                <div className="widget subscribe no-box">
                  <h5 className="widget-title">
                    About Us
                    <span></span>
                  </h5>
                  <p>
                    The Official NSDC Student Chapter of VCET's Artificial
                    Intelligence and Data Science Department provides a
                    community to support Artificial Intelligence & Data Science
                    learners of all ages, backgrounds and skills.
                  </p>
                </div>
              </motion.div>
              <motion.div className="col-xs-12 col-sm-6 col-md-3"


initial={{
    opacity: 0,

    x: 0,
}}
whileInView={{
    opacity: 1,

    x: 0,
    transition: {
        delay: 0.3,
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.5,
    },
}}
viewport={{ once: true }}
              >
                <div className="widget no-box">
                  <h5 className="widget-title">
                    Address
                    <span></span>
                  </h5>
                  <p>
                    Vidyavardhini's College Of Engineering and Technology, K.T.
                    Marg, Vartak College Campus Vasai Road, Vasai-Virar,
                    Maharashtra 401202
                  </p>
                </div>
              </motion.div>
              <motion.div className="col-xs-12 col-sm-6 col-md-3"


initial={{
    opacity: 0,

    x: 0,
}}
whileInView={{
    opacity: 1,

    x: 0,
    transition: {
        delay: 0.3,
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.5,
    },
}}
viewport={{ once: true }}
              >
                <div className="widget no-box">
                  <h5 className="widget-title">
                    Quick Links
                    <span></span>
                  </h5>
                  <ul className="thumbnail-widget">
                    <li>
                      <div className="thumb-content">
                        <Link to="/">Home</Link>
                      </div>
                    </li>
                    <li>
                      <div className="thumb-content">
                      <Link to="/events">Events</Link>
                      </div>
                    </li>
                    <li>
                      <div className="thumb-content">
                        <Link to="/team">Team</Link>
                      </div>
                    </li>
                    <li>
                      <div className="thumb-content">
                        <Link to="/contact">Contact</Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
              <motion.div className="col-xs-12 col-sm-6 col-md-3"

initial={{
    opacity: 0,

    x: 0,
}}
whileInView={{
    opacity: 1,

    x: 0,
    transition: {
        delay: 0.3,
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.5,
    },
}}
viewport={{ once: true }}
              >
                <div className="widget no-box">
                  <h5 className="widget-title">
                    Contact Us
                    <span></span>
                  </h5>
                  <p>
                    <a
                      target="_blank"
                      href="mailto:nsdc@vcet.edu.in"
                      className="gmail"
                      title="glorythemes"
                    >
                      <i
                        className="fa fa-envelope-o margin-10px-right"
                        aria-hidden="true"
                      ></i>
                      nsdc@vcet.edu.in
                    </a>
                  </p>
                  <ul className="social-footer2">
                    <li className="">
                      <a
                        target="_blank"
                        href="https://www.linkedin.com/in/vcet-nsdc"
                        className="linkedin"
                      >
                       <i class="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li className="">
                      <a
                        target="_blank"
                        href="https://www.youtube.com/channel/UCx2xEKNJ0I1ogde2JxP-4BA"
                        className="youtube"
                      >
                        <i class="fa fa-youtube"></i>
                      </a>
                    </li>
                    <li className="">
                      <a
                        title="instagram"
                        target="_blank"
                        href="https://www.instagram.com/vcet.nsdc"
                      >
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
