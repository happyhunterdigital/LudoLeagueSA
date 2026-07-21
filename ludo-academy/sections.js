const { useState, useEffect, useRef } = React;
const { FadeIn, Magnet, ContactButton } = window.LudoComponents;

const HeroSection = ({ openForm }) => (
    <section className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#0f1535] to-[#0a0e27]">
        <FadeIn delay={0} y={-20}>
            <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 nav-text font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base">
                <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
                <a href="#training" className="hover:opacity-70 transition-opacity">Training</a>
                <a href="#success" className="hover:opacity-70 transition-opacity">Success</a>
                <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
            </nav>
        </FadeIn>
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-12">
            <FadeIn delay={0.15} y={20} className="w-full text-center mb-6 sm:mb-8">
                <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw]">Ludo Academy</h1>
            </FadeIn>
            <FadeIn delay={0.3} y={20} className="mb-8 sm:mb-10">
                <p className="text-[#d4af37] font-light uppercase tracking-wide leading-snug max-w-md mx-auto text-center text-sm sm:text-base md:text-lg opacity-90">Where every move matters. Strategy, discipline, and excellence.</p>
            </FadeIn>
            <FadeIn delay={0.45} y={20} className="mb-10 sm:mb-12">
                <ContactButton label="Join Us" onClick={openForm} />
            </FadeIn>
            <FadeIn delay={0.6} y={30} className="w-full max-w-4xl mx-auto">
                <Magnet padding={150} strength={3}>
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-[#d4af37]/30">
                        <img src="https://res.cloudinary.com/dfzeb1s54/image/upload/v1784647925/Ludo_officials_after_training_for_their_respective_leagues_in_Alex_Soweto_and_Mamelodi._2022_tqwkjs.jpg" alt="Ludo Academy Training Session" className="w-full h-auto object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27]/60 to-transparent"></div>
                    </div>
                </Magnet>
                            </FadeIn>
        </div>
    </section>
);

const MarqueeSection = () => {
    const sectionRef = useRef(null); const [offset, setOffset] = useState(0);
    const row1Images = [
        "https://res.cloudinary.com/dfzeb1s54/image/upload/v1784647925/Ludo_Academy_of_excellence_learning_vihidj.jpg",
        "https://res.cloudinary.com/dfzeb1s54/image/upload/v1783142171/LudoLeagueSA_vwtysc.png",
        "https://res.cloudinary.com/dfzeb1s54/image/upload/v1779664335/Soweto_Ludo_League_Tournament_rnkewh.jpg",
        "https://res.cloudinary.com/dfzeb1s54/image/upload/v1779563470/INTER-TOWNSHIP-KNOCKOUT_Battle_of_the_Kasis.The_ultimate_inter_township_clash.The_three_titans_of_the_Ludo_League_South_Africa_rmnqm4.jpg",
        "https://res.cloudinary.com/dfzeb1s54/image/upload/v1784649728/Ludo_Academy_of_Excellence_2K_202607211756_1_b1jvqu.jpg"
    ];
    const tripled1 = [...row1Images, ...row1Images, ...row1Images];
    useEffect(() => { 
        const handleScroll = () => { if (sectionRef.current) setOffset((window.scrollY - sectionRef.current.offsetTop + window.innerHeight) * 0.3); }; 
        window.addEventListener("scroll", handleScroll, { passive: true }); return () => window.removeEventListener("scroll", handleScroll); 
    }, []);
    return (
        <section ref={sectionRef} className="bg-[#0a0e27] pt-16 sm:pt-20 md:pt-24 pb-8 overflow-hidden">
            <div className="flex flex-col gap-3">
                <div className="marquee-row flex gap-3" style={{ transform: `translateX(${offset - 200}px)` }}>
                    {tripled1.map((src, i) => (
                        <img key={i} src={src} alt="" className="w-[200px] h-[130px] sm:w-[280px] sm:h-[180px] md:w-[360px] md:h-[230px] rounded-xl sm:rounded-2xl object-cover flex-shrink-0 border-2 border-[#d4af37]/20" loading="lazy" />
                    ))}
                </div>
            </div>
        </section>
    );
};

window.LudoSections = { HeroSection, MarqueeSection };
