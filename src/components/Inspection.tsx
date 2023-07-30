
import './Inspection.css'


interface InspectionProps {
  handleClick: (location: string) => void;
}

const Inspection: React.FC<InspectionProps> = ({ handleClick }) => {
  return (
    <div className="inspection-container">
      <h1 style={{
      color: 'red',
      fontWeight: '900',
      letterSpacing: '1px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      padding: '0.5em',
      borderRadius: '10px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      In which area have you spotted the issue?
    </h1>
      <div className='site-office-buttons'>
      <button className='main-btn' onClick={() => handleClick('OnSite')}>On Site</button>
      <button className='main-btn' onClick={() => handleClick('TheOffice')}>In the Office</button>
    </div>
    </div>
  );
};

export default Inspection;
