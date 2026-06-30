import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import ImpactSection from '../components/landing/ImpactSection';
import ReasonsSection from '../components/landing/ReasonsSection';
import CommoditySlider from '../components/landing/CommoditySlider';
import ContactSection from '../components/landing/ContactSection';
import { useLandingController } from '../hooks/useLandingController';

const LandingPage = () => {
  const { selectedPlant, setSelectedPlant } = useLandingController();

  return (
    <div className="relative min-h-screen bg-brand-dark text-white overflow-x-hidden">
      
      {/* Global Background Image with Fixed Attachment */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url(/global-bg.png)' }}
      />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-brand-dark/85" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col w-full">
        <HeroSection />
        <ImpactSection />
        <ReasonsSection />
        <CommoditySlider 
          selectedPlant={selectedPlant} 
          setSelectedPlant={setSelectedPlant} 
        />
        <ContactSection />
      </div>
      
    </div>
  );
};

export default LandingPage;
