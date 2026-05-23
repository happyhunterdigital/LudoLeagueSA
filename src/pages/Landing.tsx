import React from 'react';
import { Page } from '../App';
import { LandingHero } from '../components/features/LandingHero';
import { LandingCarousel } from '../components/features/LandingCarousel';
import { LandingFeatures } from '../components/features/LandingFeatures';
import { LandingGallery } from '../components/features/LandingGallery';
import { LandingSystems } from '../components/features/LandingSystems';
import { LandingMediaGrid } from '../components/features/LandingMediaGrid';
import { LandingCTA } from '../components/features/LandingCTA';
import { CommunityFund } from '../components/features/CommunityFund';

export const Landing = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <div className="flex flex-col w-full">
      {/* 2. Hero Section */}
      <LandingHero scrollToSection={(id) => setActivePage('Tournaments')} />
      
      {/* 3. News Ticker Carousel */}
      <LandingCarousel />

      {/* 4. Three-Column Feature Highlights */}
      <LandingFeatures />

      {/* 5. Custom Board Selection Gallery */}
      <LandingGallery />

      {/* 6 & 7. Core Systems & Sporting Structure */}
      <LandingSystems />

      {/* 8. Media Content Grid */}
      <LandingMediaGrid />

      {/* 4. Donation/Contribution Gateway */}
      <div id="donation-section">
        <CommunityFund />
      </div>

      {/* 9. Secondary CTA / Community Links */}
      <LandingCTA />
    </div>
  );
};
