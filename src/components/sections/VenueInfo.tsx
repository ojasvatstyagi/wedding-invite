export default function VenueInfo() {
  return (
    <section className="w-full py-24 px-4 text-center">
      <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl border-t-4 border-gold-500 border-b border-l border-r border-gold-500/20">
        <h2 className="font-serif text-4xl text-gold-300 mb-6 drop-shadow-md">
          The Venue
        </h2>

        <div className="mb-8">
          <h3 className="font-serif text-2xl text-gold-100 mb-2">
            Silver Spoon
          </h3>
          <p className="font-sans text-ivory-100 text-lg mb-6 tracking-wide">
            Wedding Ceremony & Banquet
            <br />
            Wednesday, 4th February 2026
          </p>

          <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden border-2 border-gold-500/30 shadow-inner mb-8 relative z-10">
            <iframe
              title="Silver Spoon Location"
              src="https://maps.google.com/maps?q=Silver%20Spoon%20Roorkee&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter grayscale-[20%] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Silver+Spoon+Roorkee"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-gold-500 text-burgundy-900 font-sans font-bold text-sm uppercase tracking-[0.2em] rounded-sm hover:bg-gold-400 hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]"
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}
