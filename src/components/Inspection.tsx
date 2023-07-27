// Inspection.tsx
import React from 'react';
import './Inspection.css'


interface InspectionProps {
  handleClick: (location: string) => void;
}

const Inspection: React.FC<InspectionProps> = ({ handleClick }) => {
  return (
    <div className="inspection-container">
      <h1 style={{margin: '3em'}}>In which area have you spotted the issue?</h1>
      <div className='site-office-buttons'>
      <button onClick={() => handleClick('OnSite')}>On Site</button>
      <button onClick={() => handleClick('TheOffice')}>In the Office</button>
    </div>
    </div>
  );
};

export default Inspection;
