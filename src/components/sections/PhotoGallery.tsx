import { useState } from "react";

export default function PhotoGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const photos = [
    {
      url: "images/gallery_1_haldi.png",
      title: "Haldi Ceremony",
      description:
        "An event of love and blessings where turmeric paste is applied to the bride and groom.",
    },
    {
      url: "images/gallery_2_mehendi.png",
      title: "Mehendi & Sangeet",
      description:
        "Adorning hands with intricate henna designs and dancing the night away with joy.",
    },
    {
      url: "images/gallery_3_wedding_portrait.png",
      title: "The Wedding Vows",
      description:
        "The sacred moment we promise our diverse forevers to one another.",
    },
    {
      url: "images/gallery_4_decor_details.png",
      title: "Decor & Details",
      description:
        "Every corner blooming with flowers and lights to celebrate our union.",
    },
    {
      url: "images/gallery_5_reception_dance.png",
      title: "Dance Night",
      description:
        "A night of celebration, music, and gratitude with our loved ones.",
    },
    {
      url: "images/bride_groom_illustration.png",
      title: "Anushka & Akshay",
      description:
        "Two souls, one heart, embarking on a beautiful journey together.",
    },
  ];

  return (
    <section className="w-full py-24 px-4">
      <h2 className="font-serif text-4xl text-center text-gold-600 mb-12 drop-shadow-sm">
        Our Moments
      </h2>

      <div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            className={`group relative overflow-hidden rounded-xl shadow-md transition-all duration-700 ease-in-out aspect-[3/4] cursor-pointer ${
              hoveredIndex !== null && hoveredIndex !== i
                ? "blur-[2px] opacity-50 scale-95 grayscale-[50%]"
                : "opacity-100 scale-100 grayscale-0 hover:shadow-2xl hover:scale-[1.02]"
            }`}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <h3 className="text-gold-300 font-serif text-2xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {photo.title}
              </h3>
              <p className="text-ivory-100 font-sans text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                {photo.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
