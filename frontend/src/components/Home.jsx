import React from "react";
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Health from "../Home/Health";
import Creator from "../Home/Creator";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <Hero />
      <Trending />
      <Health />
      <Creator />
    </div>
  );
}

export default Home;
