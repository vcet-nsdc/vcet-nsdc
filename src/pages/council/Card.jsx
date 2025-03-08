// src/Card.js
import React, { useState } from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


const Card = ({ image, title, email, subtitle, insta, linkedin }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className="card-content">
        {isHovered ? (
          <div className="links">
            <a href={`mailto:${email}`} aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
              href={insta}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href={linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        ) : (
          <img src={image} alt={title} className="card-image" />
        )}
      </div>
      <div className="card-title">
        <p className="title">{title}</p>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default Card;
