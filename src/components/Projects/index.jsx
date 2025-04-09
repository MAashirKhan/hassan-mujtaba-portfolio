"use client";
import styles from "./style.module.scss";
import Card from "./components/cards";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const projects = [
    {
      title: "Futafut Prime",
      tags: ["E-Commerce", "3rd Party Logistics", "Last Mile Service"],
      description:
        "Futafut Prime empowers MSMEs through digital solutions, enhancing their online presence and participation in the formal economy. Our comprehensive suite of digital financial services and marketplace enables businesses to grow, succeed, and bridge the gender gap in financial inclusion.",
      src: "/images/wix.jpg",
      link: "#",
      color: "#BBACAF",
    },
    {
      title: "Futafut Go",
      tags: ["Food Delivery", "Nutrition Tracking"],
      description:
        "Futafut Go is an innovative app revolutionizing nutrition tracking and personalized diet plans. The vision is to empower users to make informed choices about their food intake and develop a healthy relationship with nutrition. Our mission is to support individuals in achieving their fitness goals and promoting a balanced approach to nutrition.",
      src: "/images/hassanp1.jpeg",
      link: "#",
      color: "#977F6D",
    },
    {
      title: "Rehabit",
      tags: ["P2P Telehealth", "Health Technology"],
      description:
        "From a pool of registered and qualified therapists, we align physiotherapists according to the bookings and their availability in their respective zones. The therapists get paid on a commission basis in this model.",
      src: "/images/maven.jpg",
      link: "#",
      color: "#C2491D",
    },
    {
      title: "Rehabit",
      tags: ["B2B Telehealth", "Health Technology"],
      description:
        "We approach businesses that engage their workforce, sports teams and similar institutions and provide a free trial of our services where we collect data and gauge interest of their workforce which helps us create a special custom package for the organization according to their needs.",
      src: "/images/silencio.png",
      link: "https://www.ignant.com/2019/03/13/a-photographic-series-depicting-the-uncertain-future-of-denmarks-treasured-coastlines/",
      color: "#B62429",
    },
    {
      title: "Human Gait PHD Research",
      tags: ["Remote Physiotherapy", "Joint Tracking System"],
      description:
        "This AI-powered physiotherapy solution tracks movements via smartphone/webcam, provides real-time feedback, adapts therapy plans, enables remote monitoring, boosts engagement, and ensures secure, accessible rehab.",
      src: "/images/powell.jpg",
      link: "#",
      color: "#88A28D",
    },
    {
      title: "Spotlight 1: Artistic Work",
      tags: ["Mural Design", "Artwork"],
      description: "",
      src: "/images/maven.jpg",
      link: "#",
      color: "#C2491D",
    },
    {
      title: "Spotlight 2: Extra Curricular",
      tags: ["GDG Kolachi", "Community Work"],
      description: "",
      src: "/images/silencio.png",
      link: "#",
      color: "#B62429",
    },
    {
      title: "Spotlight 3: Entrepreneurship",
      tags: ["NIC", "Founder’s Institute", "XSEED Program"],
      description: "",
      src: "/images/powell.jpg",
      link: "#",
      color: "#88A28D",
    },
  ];

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <main ref={container} className={styles.main}>
      {projects.map((project, i) => {
        // const targetScale = 1 - ( (projects.length - i) * 0.05);
        const total = projects.length;
        const start = i / total;
        const end = (i + 1) / total;
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <Card
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            // range={[i * 0.25, 1]}
            range={[start, end]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}
