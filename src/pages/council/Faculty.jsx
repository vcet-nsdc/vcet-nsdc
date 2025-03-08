import React, { useEffect ,useState} from "react";
import './Council.css';
import facultyData from "./CD";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Faculty = () => {
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
        <h1 className="ieee_title">Faculty Incharge</h1>
      </div>
      <div className="main center" data-aos="zoom-in-up">
        {facultyData.faculty.map((faculty, index) => (
          <div className="box center" key={index}>
            <img src={faculty.image} alt="" />
            <div>
              <div className="user_name">{faculty.name}</div>
              <p className="skill">
                {faculty.position}
                <br />
                {faculty.department} Department
              </p>
            </div>
            <div className="arr_container center"
            onClick={() => handleClick(index)}>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div
              className={`left_container ${
                activeIndices.includes(index) ? "active" : "off"
              }`}
            >
              <div className="icons">
                <a href={`mailto:${faculty.email}`}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
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
};

export default Faculty;
