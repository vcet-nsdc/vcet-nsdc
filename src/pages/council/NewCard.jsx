// src/App.js
import React from "react";
import Card from "./Card";
import "./NewCard.css";
import riteshImage from "../../assets/images/1.webp";
import sakshi1Image from "../../assets/images/2.webp";
import saurabhImage from "../../assets/images/3.webp";
import konishaImage from "../../assets/images/4.webp";
import vinithImage from "../../assets/images/5.webp";
import vishwatejImage from "../../assets/images/6.webp";
import shagunImage from "../../assets/images/7.webp";
import pradeepImage from "../../assets/images/8.webp";
import dhirImage from "../../assets/images/9.webp";
import aniruddhaImage from "../../assets/images/10.webp";
import mokshadImage from "../../assets/images/11.webp";
import shubhamImage from "../../assets/images/12.webp";
import piaImage from "../../assets/images/13.webp";
import ojasiImage from "../../assets/images/14.webp";
import parthImage from "../../assets/images/15.webp";
import saloniImage from "../../assets/images/16.webp";
import sakshi2Image from "../../assets/images/17.webp";
import shreyaImage from "../../assets/images/18.webp";
import harshImage from "../../assets/images/19.webp";
import Navbar from "./Nav";
import Footer from "./Footer";

function NewCard() {
  const cards = [
    {
      image: ojasiImage,
      title: "Ojasi Prabhu",
      subtitle: "Chairperson",
      email: "ojasi.213579201@vcet.edu.in",
      insta: "https://www.instagram.com/ojasi_prabhu/",
      linkedin: "https://www.linkedin.com/in/ojasi-prabhu-8651b7268?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      image: piaImage,
      title: "Pia Purohit",
      subtitle: "Secretary",
      email: "pia.s221527201@vcet.edu.in",
      insta: "https://www.instagram.com/purohitpia",
      linkedin: "https://www.linkedin.com/in/pia-purohit-3308b8285",
    },
    {
      image: parthImage,
      title: "Parth Raut",
      subtitle: "Treasurer",
      email: "parth.213589101@vcet.edu.in",
      insta: "https://instagram.com/parth_raut_7",
      linkedin: "https://www.linkedin.com/in/parth-raut-57082018a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      image: mokshadImage,
      title: "Mokshad Sankhe",
      subtitle: "Technical Head",
      email: "mokshad.s221557106@vcet.edu.in",
      insta: "https://www.instagram.com/mokshu_sankhe/",
      linkedin: " https://www.linkedin.com/in/mokshad-sankhe/",
    },
    {
      image: sakshi2Image,
      title: "Sakshi Karande",
      subtitle: "Social Media Head",
      email: "sakshi.213409202@vcet.edu.in",
      insta: "https://www.instagram.com/sakshii_026",
      linkedin: "https://www.linkedin.com/in/sakshi-karande",
    },
    {
      image: shubhamImage,
      title: "Shubham Shah",
      subtitle: "Organizing/PR Head",
      email: "shubham.s221577109@vcet.edu.in",
      insta: "https://www.instagram.com/_shah_shubham_04/",
      linkedin: "https://www.linkedin.com/in/shubham-shah-018a66246?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    },
  ];
  const card1 = [
    {
      image: saurabhImage,
      title: "Saurabh Vishwakarma",
      subtitle: "Deputy Treasurer",
      email: "saurabh.225287101@vcet.edu.in",
      insta: "https://www.instagram.com/sau.rabh_v",
      linkedin: "https://in.linkedin.com/in/saurabh-vishwakarma-50b97225b",
    },
    {
      image: sakshi1Image,
      title: "Sakshi Patil",
      subtitle: "Deputy Documentation Head",
      email: "sakshi.225117205@vcet.edu.in ",
      insta: " https://www.instagram.com/sakshi_11204_?igsh=bTM0anVlMm5oY2hm",
      linkedin: "https://www.linkedin.com/in/sakshi-patil-3933a6328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      image: saloniImage,
      title: "Saloni Sutar",
      subtitle: "Deputy Documentation Head",
      email: "saloni.225257205@vcet.edu.in ",
      insta: "https://www.instagram.com/saloni_5261?igsh=aGdqcjhqeTcyMWJ2",
      linkedin: "https://www.linkedin.com/in/saloni-sutar-aaa16b31a",
    },
    {
      image: riteshImage,
      title: "Ritesh Shetty",
      subtitle: "Deputy Technical Head",
      email: "rithesh.225217101@vcet.edu.in ",
      insta: "https://www.instagram.com/itx_rithesh",
      linkedin: "https://www.linkedin.com/in/rithesh-shetty04/",
    },
    {
      image: konishaImage,
      title: "Konisha Thakare",
      subtitle: "Deputy Technical Head",
      email: "konisha.s238347205@vcet.edu.in ",
      insta: "https://www.instagram.com/konishathackeray/",
      linkedin: " https://www.linkedin.com/in/konisha-thakare?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },

    {
      image: dhirImage,
      title: "Dhir Surti",
      subtitle: "Deputy Social Media Head",
      email: "dhir.225247102@vcet.edu.in ",
      insta: "https://www.instagram.com/dhi_real7?igsh=MXBnYTV5Z2ZzZzNpZQ==",
      linkedin: "https://www.linkedin.com/in/dhir-surti?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      image: vinithImage,
      title: "Vinith Shetty",
      subtitle: "Deputy Social Media Head",
      email: "vinith.225227108@vcet.edu.in ",
      insta: "Instagram: https://www.instagram.com/vinith_shetty96",
      linkedin: " https://www.linkedin.com/in/vinith-shetty-451a99250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },

    {
      image: aniruddhaImage,
      title: "Aniruddh Sawant",
      subtitle: "Deputy Creative Head",
      email: "aniruddh.225197108@vcet.edu.in",
      insta: "https://www.instagram.com/anirruddha_?igsh=cG9odnZlNGpwM3g0",
      linkedin: "https://www.linkedin.com/in/aniruddh-sawant-6ba8a2314?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      image: pradeepImage,
      title: "Pradeep Rathod",
      subtitle: "Deputy Creative Head",
      email: "pradeep.225167104@vcet.edu.in",
      insta: "https://www.instagram.com/pradeep_0601/",
      linkedin: "https://www.linkedin.com/in/pradeep-rathod-b61a95260/",
    },

    {
      image: vishwatejImage,
      title: "Vishwatej Sarang",
      subtitle: "Deputy Organizing/PR Head",
      email: "vishwatej.225187101@vcet.edu.in",
      insta: "https://www.instagram.com/_.vishu_06",
      linkedin: "https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav",
    },
    {
      image: shagunImage,
      title: "Shagun Upadhyay",
      subtitle: "Deputy Organizing/PR Head",
      email: "shagun.225277201@vcet.edu.in ",
      insta: "https://www.instagram.com/shagunn.15?igsh=MXVpeDRqM2VxdDc5Mg==",
      linkedin: "https://www.linkedin.com/in/shagun-upadhyay1510?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      image: shreyaImage,
      title: "Shreya Wankhede",
      subtitle: "Deputy Organizing/PR Head",
      email: "shreya.225297202@vcet.edu.in ",
      insta: "https://www.instagram.com/shreyeeahh?igsh=amRucjlmNTRsMGxo",
      linkedin: "https://www.linkedin.com/in/shreya-wankhede-880308260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
        image: harshImage,
        title: "Harsh Tripathi",
        subtitle: "Deputy Website Head",
        email: "harsh.225267101@vcet.edu.in",
        insta: "https://www.instagram.com/harsh_3pathi/",
        linkedin: "https://www.linkedin.com/in/harsh-tripathi-h1103/",
    }
    // Add more cards as needed
  ];

  return (
    <>

    <video
           style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
          autoPlay loop muted
        >
          <source src="../img/bg_video.mov" type="video/mp4" />
        </video>
        <Navbar/>

      <div className="container">
        <h1 className="core"><span className="core-span">OUR CORE MEMBERS </span></h1>
        <div className="card-container">
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              subtitle={card.subtitle}
              email={card.email}
              insta={card.insta}
              linkedin={card.linkedin}
            />
          ))}
        </div>
      </div>
      <div className="container">
        <h1 className="deputy">OUR DEPUTY MEMBERS</h1>
        <div className="card-container">
          {card1.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              subtitle={card.subtitle}
              email={card.email}
              insta={card.insta}
              linkedin={card.linkedin}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default NewCard;
