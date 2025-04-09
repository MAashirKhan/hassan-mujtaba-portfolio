import { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, useAnimationControls } from 'framer-motion';
import styles from './style.module.scss';

// Instagram post data with embed codes
const slider1 = [
    {
        color: "#e3e5e7",
        instagramPostId: "C3pP8NUN8yh"
    },
    {
        color: "#d6d7dc",
        instagramPostId: "C0wrBvxNWeF"
    },
    {
        color: "#e3e3e3",
        instagramPostId: "CiuB2Wdjfsw"
    },
    {
        color: "#d4d4d4",
        instagramPostId: "C1gnhOQNach"
    }
]

const slider2 = [
    {
        color: "#d4e3ec",
        instagramPostId: "CmPa8-ujCEJ"
    },
    {
        color: "#e5e0e1",
        instagramPostId: "CnEtNz9jFRL"
    },
    {
        color: "#d7d4cf",
        instagramPostId: "C74moOntJPi"
    },
    {
        color: "#d4d4d4",
        instagramPostId: "DGD2UBTtqJq"
    },
]

export default function index() {
    const container = useRef(null);
    const controls1 = useAnimationControls();
    const controls2 = useAnimationControls();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

    // Continuous scrolling animation
    useEffect(() => {
        const startContinuousScroll = async () => {
            // Animation for slider 1 (left to right)
            controls1.start({
                x: [0, 150, 0],
                transition: {
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                }
            });

            // Animation for slider 2 (right to left)
            controls2.start({
                x: [0, -150, 0],
                transition: {
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                }
            });
        };

        startContinuousScroll();
    }, [controls1, controls2]);

    // Load Instagram embed script and add CSS to hide headers
    useEffect(() => {
        // Add custom CSS to hide Instagram headers
        const style = document.createElement('style');
        style.id = 'instagram-custom-style';
        style.innerHTML = `
            /* Hide Instagram headers */
            iframe.instagram-media-rendered {
                border-radius: 20px !important;
                overflow: hidden !important;
            }
            
            /* Target the header in the iframe when it loads */
            iframe.instagram-media-rendered {
                height: calc(100% - 0px) !important;
            }
            
            /* This will be applied to the iframe document once loaded */
            .instagram-media {
                border-radius: 20px !important;
            }
        `;
        document.head.appendChild(style);

        // Function to apply styles to iframe content
        const applyStylesToIframes = () => {
            const iframes = document.querySelectorAll('iframe.instagram-media-rendered');
            iframes.forEach(iframe => {
                if (iframe.contentDocument) {
                    const iframeStyle = document.createElement('style');
                    iframeStyle.textContent = `
                        /* Hide headers and footer in Instagram embed */
                        header, .X7cDz, ._aasi, ._ab8w, ._aacl._aacs, ._aacu {
                            display: none !important; 
                        }
                        ._aa5f {
                            margin-top: 0 !important;
                        }
                        /* Additional selectors to hide irrelevant content */
                        ._a9zn, ._a9zl, ._a9z-, ._a9z_, ._a9z6, ._aap1, ._aacl, ._aaco, ._aacw {
                            display: none !important;
                        }
                        /* Ensure post takes full height */
                        body, ._ab8w, ._actc {
                            padding: 0 !important;
                            margin: 0 !important;
                        }
                        /* Rounded corners for Instagram content */
                        body {
                            border-radius: 20px !important;
                            overflow: hidden !important;
                        }
                    `;
                    try {
                        iframe.contentDocument.head.appendChild(iframeStyle);
                    } catch (e) {
                        console.log('Cannot access iframe content - likely due to cross-origin policy');
                    }
                }
            });
        };

        // Check if script already exists to avoid duplicate loading
        if (!document.getElementById('instagram-embed-script')) {
            const script = document.createElement('script');
            script.id = 'instagram-embed-script';
            script.src = '//www.instagram.com/embed.js';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            
            // Add listener to apply styles after Instagram script loads
            script.onload = () => {
                // Allow time for embeds to render
                setTimeout(applyStylesToIframes, 2000);
            };
        } else {
            // If script exists, process embeds and apply styles
            if (window.instgrm && window.instgrm.Embeds) {
                window.instgrm.Embeds.process();
                setTimeout(applyStylesToIframes, 2000);
            }
        }

        // Create a MutationObserver to detect when Instagram adds iframes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length) {
                    setTimeout(applyStylesToIframes, 500);
                }
            });
        });

        // Start observing the document for added iframes
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            // Clean up
            if (document.getElementById('instagram-custom-style')) {
                document.getElementById('instagram-custom-style').remove();
            }
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={container} className={styles.slidingImages}>
            <motion.div 
                animate={controls1}
                style={{x: x1}} 
                className={styles.slider}
            >
                {
                    slider1.map((project, index) => {
                        return <div key={index} className={styles.project} style={{backgroundColor: project.color}}>
                            <div className={styles.imageContainer}>
                                <blockquote 
                                    className="instagram-media" 
                                    data-instgrm-permalink={`https://www.instagram.com/p/${project.instagramPostId}/embed/captioned/?cr=1&v=14&wp=675&rd=https%3A%2F%2Fyoursite.com&hideCaption=1`}
                                    data-instgrm-version="14"
                                    style={{
                                        background: '#FFF',
                                        border: '0',
                                        borderRadius: '20px',
                                        boxShadow: 'none',
                                        margin: '0',
                                        minWidth: '100%',
                                        minHeight: '100%',
                                        padding: '0',
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'hidden'
                                    }}
                                ></blockquote>
                            </div>
                        </div>
                    })
                }
            </motion.div>
            <motion.div 
                animate={controls2}
                style={{x: x2}} 
                className={styles.slider}
            >
                {
                    slider2.map((project, index) => {
                        return <div key={index} className={styles.project} style={{backgroundColor: project.color}}>
                            <div className={styles.imageContainer}>
                                <blockquote 
                                    className="instagram-media" 
                                    data-instgrm-permalink={`https://www.instagram.com/p/${project.instagramPostId}/embed/captioned/?cr=1&v=14&wp=675&rd=https%3A%2F%2Fyoursite.com&hideCaption=1`}
                                    data-instgrm-version="14"
                                    style={{
                                        background: '#FFF',
                                        border: '0',
                                        borderRadius: '20px',
                                        boxShadow: 'none',
                                        margin: '0',
                                        minWidth: '100%',
                                        minHeight: '100%',
                                        padding: '0',
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'hidden'
                                    }}
                                ></blockquote>
                            </div>
                        </div>
                    })
                }
            </motion.div>
            <motion.div style={{height}} className={styles.circleContainer}>
                <div className={styles.circle}></div>
            </motion.div>
        </div>
    )
}
