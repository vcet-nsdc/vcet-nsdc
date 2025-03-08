import React from 'react'
import Faculty from './Faculty'
import Be from './Be'
import Te from './Te';
// import Se from './Se';
import './Council.css'
import Nav  from "./Nav";
import Footer from './Footer';

function Council() {
  return (
    <div>
         <video id="bgVideo" style={{ pointerEvents: "none" }} preload="true" autoPlay loop muted>
          <source src="img/bg_video.mov" type="video/mp4" />
        </video>
    <Nav/>
    <Faculty/>
    <Be/>
    <Te/>
    <Footer/>
    </div>
  )
}




export default Council
