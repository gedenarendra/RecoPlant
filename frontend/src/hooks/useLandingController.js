import { useState } from 'react';

export const useLandingController = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);

  return {
    selectedPlant,
    setSelectedPlant
  };
};
