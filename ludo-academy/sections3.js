const { FadeIn, ContactButton, LiveProjectButton } = window.LudoComponents;

const ProjectsSection = () => {
    const projects = [
        { num: "01", category: "Championship", name: "National Ludo Masters", col1: ["https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1596492787861-0f406a9769e5?w=600&h=500&fit=crop"], col2: "https://images.unsplash.com/photo-1612442449529-58b6935d1f47?w=800&h=700&fit=crop" },
        { num: "02", category: "Workshop", name: "Strategic Mindset Summit", col1: ["https://images.unsplash.com/photo-1582560475093-6f76c5e3b6b1?w=600&h=400&fit=crop", "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=600&h=500&fit=crop"], col2: "https://images.unsplash.com/photo-1606503825008-909a6184f56d?w=800&h=700&fit=crop" }
    ];
    return (
        <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[60px] -mt-10 sm:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-32">
            <FadeIn delay={0} y={40}><h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-28" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>Success</h2></FadeIn>
            <div className="max-w-6xl mx-auto space-y-8">
                {projects.map((project, index) => (
                    <div key={index} className="sticky top-24 md:top-32 h-auto min-h-[85vh]" style={{ top: `${index * 28}px` }}>
                        <div className="h-full rounded-[40px] sm:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-8 flex flex-col">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div className="flex items-center gap-4 sm:gap-8">
                                    <span className="text-[#D7E2EA] font-black" style={{ fontSize: "clamp(3rem, 10vw, 140px)", lineHeight: 1 }}>{project.num}</span>
                                    <div><span className="text-[#D7E2EA] uppercase tracking-widest text-sm opacity-60">{project.category}</span><h3 className="text-[#D7E2EA] font-medium uppercase" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>{project.name}</h3></div>
                                </div>
                                <LiveProjectButton label="View Event" />
                            </div>
                            <div className="flex-1 flex flex-col sm:flex-row gap-4 min-h-0">
                                <div className="w-full sm:w-[40%] flex flex-col gap-4">
                                    <div className="flex-1 rounded-[40px] sm:rounded-[60px] overflow-hidden" style={{ maxHeight: "clamp(130px, 16vw, 230px)" }}><img src={project.col1[0]} alt="" className="w-full h-full object-cover" /></div>
                                    <div className="flex-[1.5] rounded-[40px] sm:rounded-[60px] overflow-hidden" style={{ maxHeight: "clamp(160px, 22vw, 340px)" }}><img src={project.col1[1]} alt="" className="w-full h-full object-cover" /></div>
                                </div>
                                <div className="w-full sm:w-[60%] rounded-[40px] sm:rounded-[60px] overflow-hidden min-h-[200px] sm:min-h-0"><img src={project.col2} alt="" className="w-full h-full object-cover" /></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Footer = () => (
    <footer id="contact" className="bg-[#0C0C0C] px-6 md:px-10 py-20 text-center">
        <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight mb-8" style={{ fontSize: "clamp(2rem, 8vw, 100px)" }}>Ready to Play?</h2>
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide mb-10 max-w-xl mx-auto" style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}>Learn the game. Master the mindset. Play with excellence.</p>
            <ContactButton label="Enroll Now" />
        </FadeIn>
        <div className="mt-20 pt-10 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#D7E2EA]/40 text-sm">
            <span>&copy; 2026 Ludo Academy of Excellence</span><span className="uppercase tracking-widest">Every Move Matters</span>
        </div>
    </footer>
);

window.LudoSections3 = { ProjectsSection, Footer };
