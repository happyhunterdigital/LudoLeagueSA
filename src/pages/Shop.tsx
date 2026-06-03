import React, { useState, useEffect } from 'react';
import { ShopHero } from '../components/features/ShopHero';
import { ShopSelector } from '../components/features/ShopSelector';
import { ShopFeatures } from '../components/features/ShopFeatures';
import { ShopCustomize } from '../components/features/ShopCustomize';

export const Shop = () => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<string>('board-original');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-section-index') || '0', 10);
            setActiveSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('[data-section-index]');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const scrollToSectionIndex = (index: number) => {
    const el = document.querySelector(`[data-section-index="${index}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#0F172A] text-white">
      {/* Section 0: Cinematic Intro */}
      <div data-section-index="0" className="w-full h-screen">
        <ShopHero onExplore={() => scrollToSectionIndex(1)} />
      </div>

      {/* Section 1: Choose Your Board */}
      <div data-section-index="1" className="w-full h-screen">
        <ShopSelector 
          selectedVariant={selectedVariant} 
          setSelectedVariant={setSelectedVariant} 
          onSelectComplete={() => scrollToSectionIndex(2)} 
        />
      </div>

      {/* Section 2: Feature Showcase */}
      <div data-section-index="2" className="w-full h-screen">
        <ShopFeatures selectedVariant={selectedVariant} />
      </div>

      {/* Section 3: Personalization & Mock Share */}
      <div data-section-index="3" className="w-full h-screen">
        <ShopCustomize selectedVariant={selectedVariant} />
      </div>
    </section>
  );
};
