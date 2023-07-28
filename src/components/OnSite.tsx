
import React, { useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2'; // Import SweetAlert from sweetalert2
import '../global.css';

interface OnSiteProps {
  handleProblemTypeSelection: (problemType: string) => void;
  handleRiskLevelSelection: (riskLevel: string) => void;
  handleProblemDescriptionSubmission: (problemDescription: string) => void;
  handleURLSubmission: (photoURL: File) => void; // Add the handleURLSubmission prop
}

const OnSite: React.FC<OnSiteProps> = ({ handleProblemTypeSelection, handleRiskLevelSelection, handleProblemDescriptionSubmission, handleURLSubmission }) => {
  const [selectedProblemType, setSelectedProblemType] = useState<string | null>(null);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null);
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [descriptionEntered, setDescriptionEntered] = useState<boolean>(false);
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false); 
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>(''); 

  const handleProblemTypeClick = (problemType: string) => {
    setSelectedProblemType(problemType);
    handleProblemTypeSelection(problemType);
  };

  const handleRiskLevelClick = (riskLevel: string) => {
    setSelectedRiskLevel(riskLevel);
    handleRiskLevelSelection(riskLevel);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProblemDescription(event.target.value);
    if (event.target.value.trim() !== '') {
      setDescriptionEntered(true);
    } else {
      setDescriptionEntered(false);
    }
  };

  const handleSubmit = () => {
    handleProblemDescriptionSubmission(problemDescription);
    
    Swal.fire({
      icon: 'success',
      title: `You've added the following issue:`,
      html: `
      <p>Problem Area: On Site</p>
        <p>Problem Type: ${selectedProblemType}</p>
        <p>Risk Level: ${selectedRiskLevel}</p>
        <p>Problem Description: ${problemDescription}</p>
        <!-- Add other recorded data here if needed -->
      `,
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPhotoUploaded(true);
    setPhotoPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    handleURLSubmission(acceptedFiles[0]);  // Pass the File object instead of URL
  }, [handleURLSubmission]);

  const {getRootProps, getInputProps, open} = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const handlePhotoUpload = () => {
    setPhotoUploaded(true);
    open();
  }

  const handleRemovePhoto = () => {
    setPhotoUploaded(false);
    setPhotoPreviewUrl('');
  }

  return (
    <div className="onsite-container">
      <h1>Site Environment</h1>
      <h1>Please specify a type of Hazard:</h1>
      <div className="office-hazard-btns"></div>
      <button  onClick={() => handleProblemTypeClick('Physical')} className={selectedProblemType === 'Physical' ? 'selected' : ''}>Physical</button>
      <button  onClick={() => handleProblemTypeClick('Chemical and Biological')} className={selectedProblemType === 'Chemical & Biological' ? 'selected' : ''}>Chemical & Biological</button>
      <button  onClick={() => handleProblemTypeClick('Psychosocial')} className={selectedProblemType === 'Psychosocial' ? 'selected' : ''}>Psychosocial</button>
      <button  onClick={() => handleProblemTypeClick('Environmental')} className={selectedProblemType === 'Environmental' ? 'selected' : ''}>Environmental</button>
      
      {selectedProblemType && (
        <>
          <h1>Please select the risk level:</h1>
          <button  onClick={() => handleRiskLevelClick('Low')} className={selectedRiskLevel === 'Low' ? 'selected' : ''}>Low</button>
          <button  onClick={() => handleRiskLevelClick('Medium')} className={selectedRiskLevel === 'Medium' ? 'selected' : ''}>Medium</button>
          <button  onClick={() => handleRiskLevelClick('High')} className={selectedRiskLevel === 'High' ? 'selected' : ''}>High</button>
        </>
      )}

      {selectedRiskLevel && (
        <>
          <h1>Please enter a description of the problem:</h1>
          <textarea value={problemDescription} onChange={handleDescriptionChange} />
          {descriptionEntered && (
            <>
              <button  onClick={handlePhotoUpload}>Add Photo</button>
              {photoUploaded && (
                <>
                  <div {...getRootProps()} style={{border: '1px solid black', padding: '10px', width: '200px', textAlign: 'center'}}>
                    <input {...getInputProps()} />
                  </div>
                  {photoPreviewUrl && <img src={photoPreviewUrl} alt="Preview" style={{maxWidth: '200px', maxHeight: '200px'}} />}
                  <button  onClick={handleRemovePhoto}>Remove Photo</button>
                </>
              )}
              <button  onClick={handleSubmit}>Submit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OnSite;
