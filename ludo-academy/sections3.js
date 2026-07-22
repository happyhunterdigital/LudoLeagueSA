const { FadeIn, ContactButton, LiveProjectButton } = window.LudoComponents;

const ProjectsSection = () => {
    const projects = [
        { num: "01", category: "Championship", name: "National Ludo Masters", col1: ["https://res.cloudinary.com/dfzeb1s54/image/upload/v1784649728/Ludo_Academy_of_Excellence_2K_202607211759_1_v9zrci.jpg", "https://res.cloudinary.com/dfzeb1s54/image/upload/v1784649728/Ludo_Academy_of_Excellence_2K_202607211756_yyrdvt.jpg"], col2: "https://res.cloudinary.com/dfzeb1s54/image/upload/v1784649728/Ludo_Academy_of_Excellence_2K_202607211759_l3q3oi.jpg" }, 
        { num: "02", category: "Workshop", name: "Strategic Mindset Summit", col1: ["https://res.cloudinary.com/dfzeb1s54/image/upload/v1784647925/Ludo_Academy_of_excellence_learning_vihidj.jpg", "https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142171/LudoLeagueSA_vwtysc.png"], col2: "https://res.cloudinary.com/dfzeb1s54/image/upload/v1779664335/Soweto_Ludo_League_Tournament_rnkewh.jpg" }
    ];
    return (
        <section id="success" className="bg-[#0a0e27] rounded-t-[30px] sm:rounded-t-[50px] -mt-8 sm:-mt-10 relative z-10 px-5 sm:px-8 md:px-10 py-16 sm:py-24">
            <FadeIn delay={0} y={40}><h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-12 sm:mb-16" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>Success</h2></FadeIn>
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
                {projects.map((project, index) => (
                    <div key={index} className="sticky top-20 sm:top-24 md:top-28 h-auto min-h-[70vh] sm:min-h-[75vh]" style={{ top: `${index * 20}px` }}>
                        <div className="h-full rounded-[30px] sm:rounded-[50px] border-2 border-[#d4af37]/40 bg-[#0a0e27] p-4 sm:p-6 flex flex-col">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <span className="hero-heading font-black" style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)", lineHeight: 1 }}>{project.num}</span>
                                    <div><span className="text-[#d4af37] uppercase tracking-wider text-xs sm:text-sm opacity-60">{project.category}</span><h3 className="text-[#d4af37] font-semibold uppercase" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>{project.name}</h3></div>
                                </div>
                                <LiveProjectButton label="View Event" />
                            </div>
                            <div className="flex-1 flex flex-col sm:flex-row gap-4 min-h-0">
                                <div className="w-full sm:w-[40%] flex flex-col gap-3 sm:gap-4">
                                    <div className="flex-1 rounded-[25px] sm:rounded-[40px] overflow-hidden border border-[#d4af37]/20" style={{ maxHeight: "clamp(120px, 14vw, 200px)" }}><img src={project.col1[0]} alt="" className="w-full h-full object-cover" /></div>
                                    <div className="flex-[1.5] rounded-[25px] sm:rounded-[40px] overflow-hidden border border-[#d4af37]/20" style={{ maxHeight: "clamp(140px, 18vw, 280px)" }}><img src={project.col1[1]} alt="" className="w-full h-full object-cover" /></div>
                                </div>
                                <div className="w-full sm:w-[60%] rounded-[25px] sm:rounded-[40px] overflow-hidden min-h-[180px] sm:min-h-0 border border-[#d4af37]/20"><img src={project.col2} alt="" className="w-full h-full object-cover" /></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Footer = ({ openForm }) => (
    <footer id="contact" className="bg-[#0a0e27] px-6 md:px-10 py-16 sm:py-20 text-center border-t border-[#d4af37]/20">
        <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight mb-6 sm:mb-8" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>Ready to Play?</h2>
            <p className="text-[#d4af37] font-light uppercase tracking-wide mb-8 sm:mb-10 max-w-xl mx-auto opacity-90" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}>Learn the game. Master the mindset. Play with excellence.</p>
            <ContactButton label="Enroll Now" onClick={openForm} />
        </FadeIn>
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-[#d4af37]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#d4af37]/50 text-xs sm:text-sm">
            <span>&copy; 2026 Ludo Academy of Excellence</span>
            <span className="uppercase tracking-widest">Every Move Matters</span>
        </div>
    </footer>
);

window.LudoSections3 = { ProjectsSection, Footer };
