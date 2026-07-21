const { useState, useEffect, useRef, useCallback } = React;
const { motion, useScroll, useTransform, useInView } = window.Motion;

const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }) => {
    const ref = useRef(null); const isInView = useInView(ref, { once: true, margin: "50px", amount: 0 });
    return <motion.div ref={ref} initial={{ opacity: 0, x, y }} animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>{children}</motion.div>;
};

const Magnet = ({ children, padding = 150, strength = 3 }) => {
    const ref = useRef(null); const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)"); const [isActive, setIsActive] = useState(false);
    const handleMouseMove = useCallback((e) => { 
        if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); 
        const distX = e.clientX - (rect.left + rect.width / 2); const distY = e.clientY - (rect.top + rect.height / 2); 
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < Math.max(rect.width, rect.height) / 2 + padding) { setIsActive(true); setTransform(`translate3d(${distX / strength}px, ${distY / strength}px, 0px)`); } 
        else { setIsActive(false); setTransform("translate3d(0px, 0px, 0px)"); }
    }, [padding, strength]);
    useEffect(() => { window.addEventListener("mousemove", handleMouseMove); return () => window.removeEventListener("mousemove", handleMouseMove); }, [handleMouseMove]);
    return <div ref={ref} className="magnet-wrap inline-block" style={{ transform, transition: isActive ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out" }} onMouseLeave={() => { setIsActive(false); setTransform("translate3d(0px, 0px, 0px)"); }}>{children}</div>;
};

const ContactButton = ({ label = "Contact Me", className = "", onClick }) => (
    <button onClick={onClick} className={`contact-gradient font-semibold uppercase tracking-wider rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-sm sm:text-base md:text-lg transition-all duration-300 ${className}`}>
        {label}
    </button>
);

const LiveProjectButton = ({ label = "Live Project" }) => (
    <button className="rounded-full border-2 border-[#d4af37] text-[#d4af37] font-semibold uppercase tracking-wider px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm hover:bg-[#d4af37]/10 transition-all duration-300 hover:scale-105">
        {label}
    </button>
);

const Word = ({ children, progress, range }) => { 
    const opacity = useTransform(progress, range, [0.2, 1]); 
    return <span className="inline-block mr-[0.25em]"><motion.span style={{ opacity }} className="inline-block">{children}</motion.span></span>; 
};

const AnimatedText = ({ text, className = "" }) => {
    const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] }); const words = text.split(" ");
    return <p ref={ref} className={`${className}`} style={{ lineHeight: 1.6 }}>{words.map((word, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{word}</Word>)}</p>;
};

window.LudoComponents = { FadeIn, Magnet, ContactButton, LiveProjectButton, AnimatedText };
