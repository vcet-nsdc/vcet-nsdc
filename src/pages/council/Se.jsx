import React, { useState } from "react";
import "./Council.css";
import teamData from "./councilData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faTimes,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Se() {
  const [activeIndices, setActiveIndices] = useState([]);

  const handleClick = (index) => {
    setActiveIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
  };
  return (
    <div className="faculty">
      <div style={{ marginTop: "30px" }}>
        <h1 className="ieee_title">SE Coordinators</h1>
      </div>
      <div className="main center" data-aos="zoom-in-up">
        {teamData.se.map((data, index) => (
          <div className="box center" key={index}>
            <div className="img-container">
              {data.path && (
                <img
                  className="img-tag"
                  src={data.path}
                  alt={data.name}
                  loading="lazy"
                />
              )}
            </div>
            <div>
              <div className="user_name">{data.name}</div>
              <p className="skill">
                {data.position}
                <br />
              </p>
            </div>
            <div
              className="arr_container center"
              onClick={() => handleClick(index)}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div
              className={`left_container ${
                activeIndices.includes(index) ? "active" : "off"
              }`}
            >
              <div className="icons">
                {Object.entries(data.socialLinks).map(([key, value], j) => (
                  <a
                    key={j}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {key === "github" && <FontAwesomeIcon icon={faGithub} />}
                    {key === "linkedin" && (
                      <FontAwesomeIcon icon={faLinkedin} />
                    )}
                    {key === "email" && <FontAwesomeIcon icon={faEnvelope} />}
                    {key === "instagram" && (
                      <FontAwesomeIcon icon={faInstagram} />
                    )}
                  </a>
                ))}
              </div>
              <div className="cancel center" onClick={() => handleClick(index)}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Se;
