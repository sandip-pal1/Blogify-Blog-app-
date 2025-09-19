import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);
  const username = profile?.name || "Blogger";

  return (
    <div className="container mx-auto my-12 p-4 space-y-9 px-20 py-3">
      <h1 className="text-2xl font-bold mb-6">About Blogify</h1>

      <p className="text-lg">
        Welcome,{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500 capitalize">
          {username}
        </strong>
        ! We’re glad to have you here on <strong>Blogify</strong>, a modern
        platform built for sharing ideas, stories, and creativity with the
        world.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">Our Mission</h2>
      <p>
        At Blogify, our mission is to empower individuals to express themselves
        freely and connect with others through the power of words. We aim to
        create a space where bloggers, creators, and readers come together to
        learn, inspire, and grow.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">Our Vision</h2>
      <p>
        We envision Blogify as a hub for creative minds across the globe. A
        place where meaningful conversations happen, diverse perspectives are
        celebrated, and knowledge flows without barriers.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">Why Blogify?</h2>
      <p>
        ✦ Easy-to-use platform for publishing blogs <br />
        ✦ Connect with a wide community of readers and writers <br />
        ✦ Share knowledge, stories, and insights that matter <br />
        ✦ A clean, modern, and responsive experience for everyone
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">About the Developer</h2>
      <p>
        Blogify was designed and developed by{" "}
        <strong className="text-blue-800">Sandip Pal</strong>, a passionate
        developer with a love for building innovative and user-friendly web
        applications.
      </p>
      <p>
        Connect with Sandip here: <br />
        <a
          href="https://github.com/sandip-pal1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mr-4"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/sandip-pal-7877b9285/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          LinkedIn
        </a>
      </p>
    </div>
  );
}

export default About;
