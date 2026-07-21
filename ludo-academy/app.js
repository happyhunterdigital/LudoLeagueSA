const { HeroSection, MarqueeSection } = window.LudoSections;
const { AboutSection, ServicesSection } = window.LudoSections2;
const { ProjectsSection, Footer } = window.LudoSections3;

const App = () => (
    <div className="overflow-x-clip">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <Footer />
    </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
