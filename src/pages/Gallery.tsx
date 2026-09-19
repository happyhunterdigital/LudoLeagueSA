import { motion } from 'motion/react';

const GALLERY_IMAGES = [
  { src: "https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1776949477/Ludo_League_SA_tough_match_evhrw5.jpg", alt: "Intense Ludo League SA tournament match in progress" },
  { src: "https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1777030102/Ludo_League_SA_tourmanent_in_session_e0qruk.jpg", alt: "Ludo League SA tournament session with players around the board" },
  { src: "https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1776949476/Ludo_League_SA_women_and_kids_oioj8d.jpg", alt: "Women and children playing Ludo at a community event" },
  { src: "https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1776949477/Ludo_League_SA_School_teams_playing_Ludo_jhuckm.jpg", alt: "School teams playing Ludo in the Ludo4Schools programme" },
  { src: "https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1776949475/Ludo_League_SA_Africa_Playing_tq1eth.jpg", alt: "Community players enjoying a Ludo League SA match" },
  { src: "https://res.cloudinary.com/dkyg07qvv/image/upload/q_auto/f_auto/v1776949473/Ludo_League_SA_Corporate_exhibition_rv2l3j.jpg", alt: "Ludo League SA corporate exhibition match" }
];

export const Gallery = () => {
  return (
    <section id="gallery" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 border-b" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="tag-status mb-6">Community & Culture</div>
          <h2 className="text-6xl md:text-8xl font-display font-black mb-8 uppercase italic leading-none">The Gallery</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden relative group shadow-2xl border ${index === 0 ? 'col-span-2 md:col-span-2 md:row-span-2 h-48 md:h-[400px]' : 'h-32 md:h-48'}`}
              style={{ borderColor: 'var(--border-color)' }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
