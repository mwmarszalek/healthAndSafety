import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2"; 
import "../global.css";
import "./TheOffice.css";
import { Form, Button } from "react-bootstrap";
import { UserInput } from "../App";

interface TheOfficeProps {
  handleProblemTypeSelection: (problemType: string) => void;
  handleRiskLevelSelection: (riskLevel: string) => void;
  handleProblemDescriptionSubmission: (problemDescription: string) => void;
  handleURLSubmission: (photoURL: File) => void;
  violations: UserInput[];
}

const TheOffice: React.FC<TheOfficeProps> = ({
  handleProblemTypeSelection,
  handleRiskLevelSelection,
  handleProblemDescriptionSubmission,
  handleURLSubmission,
  violations,
}) => {
  // Additional states
  const [locationDescription, setLocationDescription] = useState<string>("");
  const [isLocationDescribed, setIsLocationDescribed] = useState<boolean>(false);
  const [selectedProblemType, setSelectedProblemType] = useState<string | null>(null);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null);
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [descriptionEntered, setDescriptionEntered] = useState<boolean>(false);
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>("");

  // Add this function to handle location description
  const handleLocationDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocationDescription(event.target.value);
  };

  // Add this function to handle continue button click
  const handleContinueButtonClick = () => {
    if (locationDescription.trim() !== "") {
      setIsLocationDescribed(true);
    }
  };

  const handleClick = (
    setterFunction: React.Dispatch<React.SetStateAction<string | null>>,
    handlerFunction: (value: string) => void,
    value: string
  ) => {
    setterFunction(value);
    handlerFunction(value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProblemDescription(event.target.value);
    if (event.target.value.trim() !== "") {
      setDescriptionEntered(true);
    } else {
      setDescriptionEntered(false);
    }
  };

  const handleSubmit = () => {
    handleProblemDescriptionSubmission(problemDescription);

    Swal.fire({
      icon: "success",
      title: `On Site Issue:`,
      html: `
          <div>
            <p>Location: ${locationDescription}</p>
            <p>Problem Type: ${selectedProblemType}</p>
            <p>Risk Level: ${selectedRiskLevel}</p>
            <p>Problem Description: ${problemDescription}</p>
          </div>
      `,
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setPhotoUploaded(true);
      handleURLSubmission(acceptedFiles[0]);
      // setPhotoPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [handleURLSubmission]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const handleRemovePhoto = () => {
    setPhotoUploaded(false);
    setPhotoPreviewUrl("");
  };

  const getButtonStyle = (selectedValue: string, buttonValue: string) => ({
    backgroundColor: selectedValue === buttonValue ? "#05c7c3" : "transparent",
    color: "black",
  });

  return (
    <div className="theoffice-container">
      <h1>Office Environment</h1>
      <h1>Please describe the location:</h1>
      <Form.Control
        as="textarea"
        value={locationDescription}
        onChange={handleLocationDescriptionChange}
        style={{ marginBottom: "15px", width: "50%" }}
        placeholder="Enter location description here"
      />
      {!isLocationDescribed ? (
        <Button onClick={handleContinueButtonClick}>Continue</Button>
      ) : null}
      {isLocationDescribed && (
        <>
          <h1>Please specify a type of Hazard:</h1>
          <div className="office-hazard-btns">
            <button
              onClick={() => handleClick(setSelectedProblemType, handleProblemTypeSelection, "Physical")}
              style={getButtonStyle(selectedProblemType || "", "Physical")}
            >
              Physical
            </button>
            <button
              onClick={() => handleClick(setSelectedProblemType, handleProblemTypeSelection, "Chemical and Biological")}
              style={getButtonStyle(selectedProblemType || "", "Chemical and Biological")}
            >
              Chemical & Biological
            </button>
            <button
              onClick={() => handleClick(setSelectedProblemType, handleProblemTypeSelection, "Psychosocial")}
              style={getButtonStyle(selectedProblemType || "", "Psychosocial")}
            >
              Psychosocial
            </button>
            <button
              onClick={() => handleClick(setSelectedProblemType, handleProblemTypeSelection, "Environmental")}
              style={getButtonStyle(selectedProblemType || "", "Environmental")}
            >
              Environmental
            </button>
          </div>
          {selectedProblemType && (
            <>
              <h1>Please select the risk level:</h1>
              <div className="office-risk-btns">
                <button
                  onClick={() => handleClick(setSelectedRiskLevel, handleRiskLevelSelection, "Low")}
                  style={getButtonStyle(selectedRiskLevel || "", "Low")}
                >
                  Low
                </button>
                <button
                  onClick={() => handleClick(setSelectedRiskLevel, handleRiskLevelSelection, "Medium")}
                  style={getButtonStyle(selectedRiskLevel || "", "Medium")}
                >
                  Medium
                </button>
                <button
                  onClick={() => handleClick(setSelectedRiskLevel, handleRiskLevelSelection, "High")}
                  style={getButtonStyle(selectedRiskLevel || "", "High")}
                >
                  High
                </button>
              </div>
            </>
          )}
          {selectedRiskLevel && (
            <>
              <h1>Please enter a description of the problem:</h1>
              <Form.Control
                as="textarea"
                value={problemDescription}
                onChange={handleDescriptionChange}
                style={{ marginBottom: "15px", width: "50%" }}
                placeholder="Enter problem description here"
              />
              {descriptionEntered && (
                <div className="final-btns-container">
                  {photoUploaded ? (
                    <>
                      <div
                        {...getRootProps()}
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          width: "200px",
                          textAlign: "center",
                        }}
                      >
                        <input {...getInputProps()} />
                      </div>
                      {photoPreviewUrl && (
                        <img
                          src={photoPreviewUrl}
                          alt="Preview"
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                      )}
                      <button onClick={handleRemovePhoto}>Remove Photo</button>
                    </>
                  ) : (
                    <button onClick={open}>Upload Photo</button>
                  )}
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TheOffice;
