const { useState, useEffect, useRef } = React;
const { FadeIn, Magnet, ContactButton } = window.LudoComponents;

const HeroSection = () => (
    <section className="h-screen flex flex-col relative overflow-x-clip">
        <FadeIn delay={0} y={-20}>
            <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg">
                <a href="#about" className="hover:opacity-70">About</a><a href="#services" className="hover:opacity-70">Training</a><a href="#projects" className="hover:opacity-70">Success</a><a href="#contact" className="hover:opacity-70">Contact</a>
            </nav>
        </FadeIn>
        <div className="overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5">
            <FadeIn delay={0.15} y={40}>
                <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] md:text-[16vw] lg:text-[17.5vw]">Ludo Academy</h1>
            </FadeIn>
        </div>
        <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 mt-auto z-20">
            <FadeIn delay={0.35} y={20}>
                <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[260px]" style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}>Where every move matters. Strategy, discipline, and excellence.</p>
            </FadeIn>
            <FadeIn delay={0.5} y={20}><ContactButton label="Join Us" /></FadeIn>
        </div>
        <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 w-[220px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-[35%] sm:top-auto sm:translate-y-0 sm:bottom-0">
            <Magnet padding={150} strength={3}>
                <img src="https://images.unsplash.com/photo-1612442449529-58b6935d1f47?w=800&q=80" alt="Ludo Board Strategy" className="w-full h-auto object-cover rounded-3xl opacity-90" loading="lazy" />
            </Magnet>
        </FadeIn>
    </section>
);

const MarqueeSection = () => {
    const sectionRef = useRef(null);
    const [offset, setOffset] = useState(0);
    const row1Images = ["https://images.unsplash.com/photo-1612442449529-58b6935d1f47?w=420&h=270&fit=crop", "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=420&h=270&fit=crop", "https://images.unsplash.com/photo-1596492787861-0f406a9769e5?w=420&h=270&fit=crop", "https://images.unsplash.com/photo-1582560475093-6f76c5e3b6b1?w=420&h=270&fit=crop", "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=420&h=270&fit=crop"];
    const tripled1 = [...row1Images, ...row1Images, ...row1Images];
    useEffect(() => {
        const handleScroll = () => { if (sectionRef.current) setOffset((window.scrollY - sectionRef.current.offsetTop + window.innerHeight) * 0.3); };
        window.addEventListener("scroll", handleScroll, { passive: true }); return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
            <div className="flex flex-col gap-3">
                <div className="marquee-row flex gap-3" style={{ transform: `translateX(${offset - 200}px)` }}>
                    {tripled1.map((src, i) => <img key={i} src={src} alt="" className="w-[260px] h-[160px] sm:w-[420px] sm:h-[270px] rounded-2xl object-cover flex-shrink-0" loading="lazy" />)}
                </div>
            </div>
        </section>
    );
};

window.LudoSections = { HeroSection, MarqueeSection };
