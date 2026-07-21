const { useState } = React;
const { RegistrationForm, CookieConsent } = window.LudoForms;
const { HeroSection, MarqueeSection } = window.LudoSections;
const { AboutSection, ServicesSection } = window.LudoSections2;
const { ProjectsSection, Footer } = window.LudoSections3;

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="overflow-x-clip relative">
      <HeroSection openForm={() => setIsFormOpen(true)} />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <Footer openForm={() => setIsFormOpen(true)} />
      <RegistrationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <CookieConsent />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
