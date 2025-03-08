import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Home  from "./pages/council/Home";
import Landing from "./pages/council/IEvents";
import Contact from "./pages/council/Contact";
import NSDCInauguration from "./pages/council/Inaugration";
import TechBlitz from "./pages/council/TechBlitz";
import Vnps from "./pages/council/Vnps";
import Logo from "./pages/council/logo";
import Nvidia from "./pages/council/Nvidia";
import Product from "./pages/council/Product";
import PowerBi from "./pages/council/PowerBi";
import Techzette from "./pages/council/Techzette";
import NewCard from "./pages/council/NewCard";
import Oscillation from "./pages/council/Oscillation";
import Codeofista from "./pages/council/Codeofiesta";
import Productshowcase24 from "./pages/council/Productshowcase24";



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/team" element={<NewCard/>}/>
        <Route path="/events" element={<Landing/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/inaugration" element={<NSDCInauguration/>}/>
        <Route path="/techBlitz" element={<TechBlitz/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/powerbi" element={<PowerBi/>}/>
        <Route path="/techzette" element={<Techzette/>}/>
        <Route path="/nvidia" element={<Nvidia/>}/>
        <Route path="/vnps" element={<Vnps/>}/>
        <Route path="/oscillation" element={<Oscillation/>}/>
        <Route path="/logo" element={<Logo/>}/>
        <Route path="/codeofiesta" element={<Codeofista />} />
        <Route path="/productshowcase24" element={<Productshowcase24 />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App  ;
