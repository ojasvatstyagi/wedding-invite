import { useEffect, useRef } from "react";

export default function WelcomeSection() {
  const container = useRef<HTMLDivElement>(null);

  // GSAP animations removed for instant visibility and static rendering
  useEffect(() => {
    // No-op for now, animations removed as requested by user
  }, []);

  return (
    <section
      ref={container}
      className="w-full min-h-screen flex flex-col items-center justify-center text-center p-8"
    >
      <div className="max-w-4xl mx-auto backdrop-blur-sm bg-black/10 p-8 md:p-12 rounded-2xl border border-gold-500/20 shadow-xl flex flex-col items-center">
        {/* Royal Portrait */}
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gold-500/50 shadow-2xl mb-8">
          <img
            src="/images/invited.png"
            alt="Anushka and Akshay"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="font-serif text-4xl md:text-6xl text-gold-300 mb-6 drop-shadow-md">
          Anushka & Akshay
        </h2>
        <div className="w-24 h-1 bg-gold-500 mx-auto my-6 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
        <p className="font-sans text-lg md:text-xl text-gold-100 leading-relaxed max-w-2xl mx-auto drop-shadow-sm font-medium">
          "A New Beginning" <br />
          <br />
          With immense joy, we invite you to share in the celebration of love as
          we unite our children.
          <br />
          <br />
          Daughter of Mr. Sanjay & Mrs. Anuradha Tyagi <br />
          and <br />
          Son of Mr. Dev & Mrs. Lalita Tyagi
        </p>
        <div className="mt-12">
          <span className="font-script text-5xl text-gold-600 block mb-2">
            #AA
          </span>
        </div>
      </div>
    </section>
  );
}
