import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    title: "Arrival of Barat",
    date: "Feb 04, 2026",
    time: "6:00 PM",
    description: "The grand entrance of the groom with music and dancing.",
    color: "bg-red-900/40 border-gold-500/30",
    image: "/images/arrival_of_barat.png", // Festive vibe
  },
  {
    title: "Welcome Procession",
    date: "Feb 04, 2026",
    time: "6:30 PM",
    description: "Welcoming the guests and the groom's family.",
    color: "bg-gold-900/40 border-gold-500/30",
    image: "/images/welcome_procession.png", // Welcoming vibe
  },
  {
    title: "The Banquet",
    date: "Feb 04, 2026",
    time: "7:00 PM",
    description: "A delicious feast to celebrate the union.",
    color: "bg-red-900/40 border-gold-500/30",
    image: "/images/wedding_venue_illustration.png", // Celebration
  },
  {
    title: "Vidai Ceremony",
    date: "Feb 04, 2026",
    time: "Starlit Night",
    description: "In the shade of stars, a new journey begins.",
    color: "bg-gold-900/40 border-gold-500/30",
    image: "/images/vidai_ceremony.png", // Atmospheric
  },
];

export default function EventTimeline() {
  const container = useRef<HTMLDivElement>(null);

  // Animations removed for instant visibility as requested
  useEffect(() => {
    // No-op
  }, []);

  return (
    <section
      ref={container}
      className="w-full min-h-screen py-24 px-4 relative overflow-hidden"
    >
      <h2 className="font-serif text-5xl text-center text-gold-600 mb-16 drop-shadow-sm">
        Event Timeline
      </h2>

      <div className="max-w-4xl mx-auto relative">
        {/* Central Line */}
        <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-1 bg-gold-300 -translate-x-1/2 rounded-full hidden md:block" />

        <div className="space-y-16">
          {events.map((event, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center justify-between ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Spacer for opposite side */}
              <div className="w-full md:w-5/12 hidden md:block" />

              {/* Center Dot */}
              <div className="w-6 h-6 bg-gold-500 rounded-full border-4 border-ivory-100 z-10 shadow-md mb-4 md:mb-0" />

              {/* Event Card */}
              {/* Event Card */}
              <div className="event-card w-full md:w-5/12 p-1">
                <div
                  className={`${event.color} bg-opacity-95 backdrop-blur-md p-0 rounded-xl border border-gold-500/40 shadow-[0_10px_40px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.6)] transition-all cursor-default transform hover:-translate-y-1 duration-300 overflow-hidden`}
                >
                  {/* Image Header */}
                  {/* @ts-ignore */}
                  <div className="h-48 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    {/* @ts-ignore */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute bottom-3 left-4 right-4 z-20 flex justify-between items-end">
                      <h3 className="font-serif text-2xl text-gold-100 drop-shadow-lg leading-none">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 pt-4 relative">
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-bold text-gold-100 bg-black/60 px-3 py-1 rounded-full text-xs border border-gold-500/30">
                        {event.time}
                      </span>
                      <h4 className="font-sans text-sm font-semibold text-gold-200 uppercase tracking-wide">
                        {event.date}
                      </h4>
                    </div>

                    <p className="font-sans text-ivory-100/90 text-sm leading-relaxed drop-shadow-sm font-medium">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
