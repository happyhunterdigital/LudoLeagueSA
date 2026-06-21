import { Page } from '../App';
import { LandingHero } from '../components/features/LandingHero';
import { LandingCarousel } from '../components/features/LandingCarousel';
import { LandingFeatures } from '../components/features/LandingFeatures';
import { LandingGallery } from '../components/features/LandingGallery';
import { LandingSystems } from '../components/features/LandingSystems';
import { LandingMediaGrid } from '../components/features/LandingMediaGrid';
import { SocialProofSection } from '../components/features/SocialProofSection';
import { LeadCaptureSection } from '../components/features/LeadCaptureSection';
import { LandingCTA } from '../components/features/LandingCTA';
import { CommunityFund } from '../components/features/CommunityFund';

export const Landing = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <div className="flex flex-col w-full bg-black">
      {/* Hero Section */}
      <LandingHero scrollToSection={(id) => setActivePage('Tournaments')} />
      
      {/* News Ticker Carousel */}
      <LandingCarousel />

      {/* Feature / Tournament Highlights */}
      <LandingFeatures />

      {/* Board Selection Gallery */}
      <LandingGallery />

      {/* Core Systems & Sporting Structure */}
      <LandingSystems />

      {/* Media Content Grid */}
      <LandingMediaGrid />

      {/* Social Proof / Community */}
      <SocialProofSection />

      {/* Donation / Community Fund */}
      <div id="donation-section">
        <CommunityFund />
      </div>

      {/* Lead Capture / Email Orchestration */}
      <LeadCaptureSection />

      {/* CTA / Community Links */}
      <LandingCTA />
    </div>
  );
};
