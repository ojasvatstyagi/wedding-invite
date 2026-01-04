import { useState, useLayoutEffect } from "react";
import Layout from "./components/ui/Layout";
import { Scroll } from "@react-three/drei";
import Scene3D from "./components/3D/Scene3D";
import EnvelopeModel from "./components/3D/EnvelopeModel";
import FloralElements from "./components/3D/FloralElements";
import WelcomeSection from "./components/sections/WelcomeSection";
import EventTimeline from "./components/sections/EventTimeline";
import VenueInfo from "./components/sections/VenueInfo";
import PhotoGallery from "./components/sections/PhotoGallery";

import AudioPlayer from "./components/ui/AudioPlayer";
import LoadingScreen from "./components/ui/LoadingScreen";

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  // Track scroll to hide indicator
  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <LoadingScreen />
      <AudioPlayer start={hasStarted} />

      <div className="relative w-full h-screen">
        {/* 3D Background */}
        <Scene3D>
          <EnvelopeModel open={hasStarted} onOpen={() => setHasStarted(true)} />
          <FloralElements />

          {hasStarted && (
            <Scroll
              html
              style={{ width: "100vw", zIndex: 50, position: "relative" }}
            >
              <div className="w-full relative z-50">
                {/* Spacing for Envelope Animation to finish before content scrolls up */}
                <div style={{ height: "100vh" }} />

                <WelcomeSection />
                <EventTimeline />
                <PhotoGallery />
                <VenueInfo />

                {/* Best Compliments & RSVP Section */}
                <div className="w-full py-16 px-4 md:px-12 text-center md:text-left relative z-10">
                  <div className="max-w-6xl mx-auto flex flex-col items-center bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-gold-500/20 shadow-2xl relative overflow-hidden">
                    <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">
                      {/* Left Side: With Best Compliments From */}
                      <div className="flex flex-col items-center lg:items-start flex-1">
                        <h3 className="font-script text-3xl md:text-4xl text-gold-400 mb-6 drop-shadow-md">
                          With Best Compliments From...
                        </h3>
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-ivory-100 font-serif text-lg leading-loose">
                          <div className="flex flex-col text-center md:text-right">
                            <span>Mr. Satyendra Tyagi</span>
                            <span>Mr. Mahesh Tyagi</span>
                            <span>Mr. Subodh Tyagi</span>
                            <span>Vivaan Tyagi</span>
                          </div>

                          {/* Vertical Divider */}
                          <div className="hidden md:block w-px bg-gold-500/50 self-stretch" />

                          <div className="flex flex-col text-center md:text-left">
                            <span>Mr. Sunil Tyagi</span>
                            <span>Mr. Anirudh Tyagi</span>
                            <span>Ojas Tyagi</span>
                            <span>Krishna Tyagi</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: RSVP */}
                      {/* Decorative Ganesh Image */}
                      <div className="w-32 md:w-40 animate-pulse">
                        <img
                          src={`${
                            import.meta.env.BASE_URL
                          }images/ganesh_rsvp.png`}
                          alt="Ganesh Ji"
                          className="w-full h-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                        />
                      </div>
                      <div className="flex flex-col items-center flex-shrink-0">
                        <h3 className="font-serif text-3xl text-gold-400 mb-4 drop-shadow-md tracking-wider">
                          RSVP
                        </h3>
                        <div className="flex flex-col items-center gap-6 font-serif text-xl text-gold-100">
                          <div className="flex flex-col items-center">
                            <span className="mb-1 font-semibold">
                              Sanjay Tyagi
                            </span>
                            <a
                              href="tel:8077326966"
                              className="font-sans text-base tracking-wider text-gold-50/80 hover:text-gold-300 transition-colors"
                            >
                              8077326966
                            </a>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="mb-1 font-semibold">
                              Vikas Tyagi
                            </span>
                            <a
                              href="tel:9719308281"
                              className="font-sans text-base tracking-wider text-gold-50/80 hover:text-gold-300 transition-colors"
                            >
                              9719308281
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mt-12 text-center">
                    <p className="font-script text-3xl md:text-5xl text-gold-200 drop-shadow-lg opacity-90">
                      Your presence is our prestigious gift.
                    </p>
                  </div>
                </div>

                <footer className="w-full py-8 text-center font-sans text-s uppercase tracking-widest pb-12 text-gold-300 drop-shadow-md">
                  Made with love • Anushka & Akshay 2026
                </footer>
              </div>
            </Scroll>
          )}
        </Scene3D>

        {/* Overlay UI - Removed from DOM when started to prevent overlap */}
        {!hasStarted && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000">
            {/* Darker semi-transparent background for contrast against the red gradient */}
            {/* Darker semi-transparent background for contrast against the red gradient */}
            <div
              className={`bg-black/60 backdrop-blur-xl p-10 rounded-xl border border-gold-400/50 shadow-2xl text-center max-w-md mx-4 animate-in fade-in zoom-in duration-500 transform-gpu backface-hidden`}
            >
              <h1 className="font-serif text-5xl md:text-7xl text-gold-300 mb-4 drop-shadow-lg">
                Anushka & Akshay
              </h1>
              <p className="font-sans text-gold-100 tracking-[0.2em] text-sm uppercase mb-8 font-semibold">
                Invite you to their wedding
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasStarted(true);
                }}
                className="px-8 py-3 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-burgundy-900 font-bold font-sans text-sm tracking-widest uppercase rounded-full shadow-lg hover:shadow-gold-400/50 hover:scale-105 transition-all cursor-pointer"
              >
                Open Invitation
              </button>
            </div>
          </div>
        )}

        {/* Scroll Indicator (Shows after start, hides on scroll) */}
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 ease-out ${
            hasStarted && !scrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-gold-300 animate-pulse">
            <span className="text-xs uppercase tracking-widest font-bold drop-shadow-md">
              Scroll Down
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-gold-300 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          </div>
        </div>
      </div>

      {/* Global Sticky Corner Borders */}
      <div className="pointer-events-none fixed top-0 left-0 z-[60] w-40 md:w-56 lg:w-80 opacity-90 mix-blend-screen">
        <img
          src={`${import.meta.env.BASE_URL}images/gold_corner_tl.png`}
          alt="Decorative Corner Top Left"
          className="w-full h-auto drop-shadow-lg"
        />
      </div>
      <div className="pointer-events-none fixed bottom-0 right-4 z-[60] w-40 md:w-56 lg:w-80 opacity-90 mix-blend-screen">
        <img
          src={`${import.meta.env.BASE_URL}images/gold_corner_br.png`}
          alt="Decorative Corner Bottom Right"
          className="w-full h-auto drop-shadow-lg"
        />
      </div>
    </Layout>
  );
}

export default App;
