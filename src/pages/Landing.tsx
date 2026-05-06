import React from 'react';
import { Page } from '../App';
import { LandingHero } from '../components/features/LandingHero';
import { ValuePropsAndPrograms } from '../components/features/ValuePropsAndPrograms';
import { CommunityFund } from '../components/features/CommunityFund';
import { StoryAndSocialProof } from '../components/features/StoryAndSocialProof';

export const Landing = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <LandingHero setActivePage={setActivePage} />
      
      {/* 2. Value Props & 3. Programs */}
      <ValuePropsAndPrograms setActivePage={setActivePage} />
      
      {/* 4. Contribution/Donation Section */}
      <div id="donation-section">
        <CommunityFund />
      </div>
      
      {/* 5. About, 6. Social Proof, 7. Founder, 8. CTA */}
      <StoryAndSocialProof setActivePage={setActivePage} />
    </div>
  );
};
