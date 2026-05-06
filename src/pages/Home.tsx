import React from 'react';
import { Page } from '../App';
import { LandingHero } from '../components/features/LandingHero';
import { ValuePropsAndPrograms } from '../components/features/ValuePropsAndPrograms';
import { CommunityFund } from '../components/features/CommunityFund';
import { StoryAndSocialProof } from '../components/features/StoryAndSocialProof';

export const Home = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <div className="flex flex-col w-full">
      {/* 2. Hero Section */}
      <LandingHero setActivePage={setActivePage} />
      
      {/* 3. Value Props & 5. Programs */}
      <ValuePropsAndPrograms setActivePage={setActivePage} />
      
      {/* 6. Contribution/Donation Section */}
      <div id="donation-section">
        <CommunityFund />
      </div>
      
      {/* 4. About, 7. Social Proof, 10. Founder, 8. CTA */}
      <StoryAndSocialProof setActivePage={setActivePage} />
    </div>
  );
};
