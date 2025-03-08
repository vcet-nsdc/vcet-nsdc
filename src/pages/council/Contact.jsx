import React from "react";
import "./Contact.css";
import Navbar from "./Nav";
import Footer from "./Footer";

export const Contact = () => {
  return (
    <>
    <Navbar/>
    <div

      style={{
        padding: "40px",
        backgroundColor: "#121212",
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif", // Modern font choice
        borderRadius: "15px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
      }}
    >
     <video
        style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 5,
          }}

        id="bgVideo"
         preload="true" autoPlay loop muted>
          <source src="../img/bg_video.mov" type="video/mp4" />
        </video>
         
      <div
        style={{
          fontSize: "32px", // Larger font for the title
          fontWeight: "700", // Bold font
          marginBottom: "30px",
          textTransform: "uppercase", // Modern touch
          letterSpacing: "2px", // Spaced-out letters for a sleek look
          zIndex: "99",
          position: "relative"
        }}
      >
        Address Location
      </div>

      <div
        style={{
          marginBottom: "30px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: "99",
          position: "relative"
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7527.319963517204!2d72.828734!3d19.38387!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7aec0a4b41bef%3A0xbd1a4ca919d6a613!2sVidyavardhini&#39;s%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1725078673579!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>

      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Transparent background for modern look
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          zIndex: "99",
          position: "relative"
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "15px",
            borderBottom: "2px solid #4FC3F7", // Accent underline
            paddingBottom: "10px",
          }}
        >
          Contact Information
        </div>
        <div style={{ fontSize: "18px", lineHeight: "1.8", color: "#d1d1d1" }}>
          <p>
            <i className="fa fa-envelope"></i> Chairperson:{" "}
            <a
              href="mailto:ojasi.213579201@vcet.edu.in"
              style={{
                color: "#4FC3F7",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              ojasi.213579201@vcet.edu.in
            </a>
          </p>
          <p>
            <i className="fa fa-envelope"></i> Secretary:{" "}
            <a
              href="mailto:Pia.s221527201@vcet.edu.in"
              style={{
                color: "#4FC3F7",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Pia.s221527201@vcet.edu.in
            </a>
          </p>
          <p>
            <i className="fa fa-envelope"></i> NSDC:{" "}
            <a
              href="mailto:nsdc@vcet.edu.in"
              style={{
                color: "#4FC3F7",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              nsdc@vcet.edu.in
            </a>
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >

          <a
            href="https://www.youtube.com/channel/UCx2xEKNJ0I1ogde2JxP-4BA"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 15px", color: "#4FC3F7", fontSize: "24px" }}
          >
            <i className="fa fa-youtube"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/vcet-nsdc"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 15px", color: "#4FC3F7", fontSize: "24px" }}
          >
            <i className="fa fa-linkedin"></i>
          </a>
          <a
            href="https://www.instagram.com/vcet.nsdc/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 15px", color: "#4FC3F7", fontSize: "24px" }}
          >
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>

    </div>
    <Footer/>
    </>
  );
};
export default Contact;
