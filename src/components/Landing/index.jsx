'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const thirdText = useRef(null);
  const fourthText = useRef(null);
  const sliderLeft = useRef(null);
  const sliderRight = useRef(null);
  
  let xPercentLeft = 0;
  let xPercentRight = 0;
  let directionLeft = -1;
  let directionRight = 1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // For scroll effect on both sliders
    gsap.to(sliderLeft.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => directionLeft = e.direction * -1
      },
      x: "-500px",
    });
    
    gsap.to(sliderRight.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => directionRight = e.direction * 1
      },
      x: "500px",
    });
    
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    // Animation for left slider
    if(xPercentLeft < -100){
      xPercentLeft = 0;
    }
    else if(xPercentLeft > 0){
      xPercentLeft = -100;
    }
    gsap.set(firstText.current, {xPercent: xPercentLeft});
    gsap.set(secondText.current, {xPercent: xPercentLeft});
    
    // Animation for right slider
    if(xPercentRight > 100){
      xPercentRight = 0;
    }
    else if(xPercentRight < 0){
      xPercentRight = 100;
    }
    gsap.set(thirdText.current, {xPercent: xPercentRight});
    gsap.set(fourthText.current, {xPercent: xPercentRight});
    
    requestAnimationFrame(animate);
    xPercentLeft += 0.1 * directionLeft;
    xPercentRight += 0.1 * directionRight;
  }

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      <Image 
        src="/images/websitesolo.png"
        fill={true}
        alt="background"
        style={{ objectFit: "contain", background: 'black', zIndex: -2 }}
      />
      
      {/* Left scrolling text */}
      <div style={{zIndex: 2}}>
        <div className={styles.sliderContainerLeft}>
          <div ref={sliderLeft} className={styles.slider}>
            <p ref={firstText}>HASSAN MUJTABA</p>
            <p ref={secondText}>HASSAN MUJTABA</p>
          </div>
        </div>
        
        {/* Right scrolling text
        <div className={styles.sliderContainerRight}>
          <div ref={sliderRight} className={styles.slider}>
            <p ref={thirdText}>HASSAN MUJTABA</p>
            <p ref={fourthText}>HASSAN MUJTABA</p>
          </div>
        </div> */}
      </div>
    </motion.main>
  )
}