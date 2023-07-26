// OnSite.tsx
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
      title: `On Site Issue:`,
      html: `
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
    <div>
      <h1>Please specify a type of H&S problem you're reporting:</h1>
      <Button variant="primary" onClick={() => handleProblemTypeClick('Ergonomic')} className={selectedProblemType === 'Ergonomic' ? 'selected' : ''}>Ergonomic</Button>
      <Button variant="primary" onClick={() => handleProblemTypeClick('Slip strips & Falls')} className={selectedProblemType === 'Slip strips & Falls' ? 'selected' : ''}>Slip strips & Falls</Button>
      <Button variant="primary" onClick={() => handleProblemTypeClick('Electric')} className={selectedProblemType === 'Electric' ? 'selected' : ''}>Electric</Button>
      <Button variant="primary" onClick={() => handleProblemTypeClick('Fire safety')} className={selectedProblemType === 'Fire safety' ? 'selected' : ''}>Fire safety</Button>
      
      {selectedProblemType && (
        <>
          <h1>Please select the risk level:</h1>
          <Button variant="primary" onClick={() => handleRiskLevelClick('Low')} className={selectedRiskLevel === 'Low' ? 'selected' : ''}>Low</Button>
          <Button variant="primary" onClick={() => handleRiskLevelClick('Medium')} className={selectedRiskLevel === 'Medium' ? 'selected' : ''}>Medium</Button>
          <Button variant="primary" onClick={() => handleRiskLevelClick('High')} className={selectedRiskLevel === 'High' ? 'selected' : ''}>High</Button>
        </>
      )}

      {selectedRiskLevel && (
        <>
          <h1>Please enter a description of the problem:</h1>
          <textarea value={problemDescription} onChange={handleDescriptionChange} />
          {descriptionEntered && (
            <>
              <Button variant="primary" onClick={handlePhotoUpload}>Add Photo</Button>
              {photoUploaded && (
                <>
                  <div {...getRootProps()} style={{border: '1px solid black', padding: '10px', width: '200px', textAlign: 'center'}}>
                    <input {...getInputProps()} />
                  </div>
                  {photoPreviewUrl && <img src={photoPreviewUrl} alt="Preview" style={{maxWidth: '200px', maxHeight: '200px'}} />}
                  <Button variant="primary" onClick={handleRemovePhoto}>Remove Photo</Button>
                </>
              )}
              <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OnSite;
