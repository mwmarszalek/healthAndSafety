// Inspection.tsx
import React from 'react';
import Button from 'react-bootstrap/Button';

interface InspectionProps {
  handleClick: (location: string) => void;
}

const Inspection: React.FC<InspectionProps> = ({ handleClick }) => {
  return (
    <div className="centered-component">
      <h1>Where is this issue?</h1>
      <Button variant="primary" onClick={() => handleClick('OnSite')}>On Site</Button>
      <Button variant="primary" onClick={() => handleClick('TheOffice')}>In the Office</Button>
    </div>
  );
};

export default Inspection;
