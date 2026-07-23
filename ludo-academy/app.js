const { CookieConsent } = window.LudoForms || {};
const { HeroSection, MarqueeSection } = window.LudoSections || {};
const { AboutSection, ServicesSection } = window.LudoSections2 || {};
const { ProjectsSection, Footer } = window.LudoSections3 || {};

const navigateToTournaments = () => {
  window.location.href = 'https://ludoleague.co.za/#tournaments';
};

const App = () => {
  return (
    <div className="overflow-x-clip relative">
      <HeroSection openForm={navigateToTournaments} />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <Footer openForm={navigateToTournaments} />
      {CookieConsent && <CookieConsent />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
