const { FadeIn, ContactButton, AnimatedText } = window.LudoComponents;

const AboutSection = () => (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 relative">
        <FadeIn delay={0.1} x={-80} className="absolute top-[4%] left-[4%] hidden sm:block">
            <img src="https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=210&h=210&fit=crop" alt="Strategy" className="w-[160px] md:w-[210px] rounded-2xl opacity-80" />
        </FadeIn>
        <FadeIn delay={0} y={40} className="mb-10 sm:mb-14 md:mb-16">
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>Our Philosophy</h2>
        </FadeIn>
        <div className="max-w-[560px] text-center mb-16 sm:mb-20 md:mb-24">
            <AnimatedText text="At Ludo Academy of Excellence, we believe that every move matters both on the board and in life. Our academy brings together passionate individuals committed to personal development, strategic thinking, and continuous learning." className="text-[#D7E2EA] font-medium leading-relaxed text-center" style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }} />
        </div>
        <FadeIn delay={0.4} y={20}><ContactButton label="Learn More" /></FadeIn>
    </section>
);

const ServicesSection = () => {
    const services = [
        { num: "01", name: "Strategic Training", desc: "Comprehensive Ludo strategy sessions covering opening moves, mid-game tactics, and end-game precision." },
        { num: "02", name: "Mentorship Program", desc: "One-on-one guidance from seasoned champions who have mastered the art of strategic gameplay." },
        { num: "03", name: "Mindset Coaching", desc: "Develop the winning mindset through patience, careful planning, and the courage to take calculated risks." }
    ];
    return (
        <section id="services" className="bg-white rounded-t-[40px] sm:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-32">
            <FadeIn delay={0} y={40}><h2 className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-28" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>Training</h2></FadeIn>
            <div className="max-w-5xl mx-auto">
                {services.map((service, i) => (
                    <FadeIn key={i} delay={i * 0.1} y={30}>
                        <div className={`flex flex-col sm:flex-row gap-4 sm:gap-8 py-8 sm:py-12 ${i > 0 ? "border-t" : ""}`} style={{ borderColor: "rgba(12, 12, 12, 0.15)" }}>
                            <div className="text-[#0C0C0C] font-black flex-shrink-0" style={{ fontSize: "clamp(3rem, 10vw, 140px)", lineHeight: 1 }}>{service.num}</div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-[#0C0C0C] font-medium uppercase mb-2" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>{service.name}</h3>
                                <p className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-60" style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}>{service.desc}</p>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
};

window.LudoSections2 = { AboutSection, ServicesSection };
