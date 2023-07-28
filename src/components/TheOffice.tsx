import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2"; // Import SweetAlert from sweetalert2
import "../global.css";
import "./TheOffice.css";
import { Form } from "react-bootstrap"; // Import the Form component from react-bootstrap
import { UserInput } from "../App";

import ViolationsList from "./ViolationsList";

interface TheOfficeProps {
  handleProblemTypeSelection: (problemType: string) => void;
  handleRiskLevelSelection: (riskLevel: string) => void;
  handleProblemDescriptionSubmission: (problemDescription: string) => void;
  handleURLSubmission: (photoURL: File) => void; // Add the handleURLSubmission prop
  violations: UserInput[];
}

const TheOffice: React.FC<TheOfficeProps> = ({
  handleProblemTypeSelection,
  handleRiskLevelSelection,
  handleProblemDescriptionSubmission,
  handleURLSubmission,
  violations,
}) => {
  const [selectedProblemType, setSelectedProblemType] = useState<string | null>(
    null
  );
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(
    null
  );
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [descriptionEntered, setDescriptionEntered] = useState<boolean>(false);
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>("");

  // Optional for spinning tick mark
  const [fileSelected, setFileSelected] = useState(false);

  const handleProblemTypeClick = (problemType: string) => {
    setSelectedProblemType(problemType);
    handleProblemTypeSelection(problemType);
  };

  const handleRiskLevelClick = (riskLevel: string) => {
    setSelectedRiskLevel(riskLevel);
    handleRiskLevelSelection(riskLevel);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
      setUploadComplete(true); // Set uploadComplete to true
      handleURLSubmission(acceptedFiles[0]);
    },
    [handleURLSubmission]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const handlePhotoUpload = () => {
    setPhotoUploaded(true);
  };

  const handleRemovePhoto = () => {
    setPhotoUploaded(false);
    setPhotoPreviewUrl("");
  };

  return (
    <div className="theoffice-container">
      <h1>Office Environemnt</h1>
      <h1>Please specify a type of Hazard:</h1>
      <div className="office-hazard-btns">
        {/* Add button text and apply className prop */}
        <button
          onClick={() => handleProblemTypeClick("Physical")}
          style={{
            /* Add styles for 'Physical' button here */
            backgroundColor:
              selectedProblemType === "Physical" ? "#05c7c3" : "transparent",
            color: selectedProblemType === "Physical" ? "black" : "black",
          }}
        >
          Physical
        </button>
        <button
          onClick={() => handleProblemTypeClick("Chemical and Biological")}
          style={{
            /* Add styles for 'Chemical & Biological' button here */
            backgroundColor:
              selectedProblemType === "Chemical & Biological"
                ? "#63c705"
                : "transparent",
            color:
              selectedProblemType === "Chemical & Biological"
                ? "black"
                : "black",
          }}
        >
          Chemical & Biological
        </button>
        <button
          onClick={() => handleProblemTypeClick("Psychosocial")}
          style={{
            /* Add styles for 'Psychosocial' button here */
            backgroundColor:
              selectedProblemType === "Psychosocial"
                ? "#05c7c3"
                : "transparent",
            color: selectedProblemType === "Psychosocial" ? "black" : "black",
          }}
        >
          Psychosocial
        </button>
        <button
          onClick={() => handleProblemTypeClick("Environmental")}
          style={{
            /* Add styles for 'Environmental' button here */
            backgroundColor:
              selectedProblemType === "Environmental"
                ? "#05c7c3"
                : "transparent",
            color: selectedProblemType === "Environmental" ? "black" : "black",
          }}
        >
          Environmental
        </button>
      </div>
      {selectedProblemType && (
        <>
          <h1>Please select the risk level:</h1>
          <div className="office-risk-btns">
            <button
              onClick={() => handleRiskLevelClick("Low")}
              style={{
                /* Add styles for 'Low' button here */
                backgroundColor:
                  selectedRiskLevel === "Low" ? "#05c7c3" : "transparent",
                color: selectedRiskLevel === "Low" ? "black" : "black",
              }}
            >
              Low
            </button>
            <button
              onClick={() => handleRiskLevelClick("Medium")}
              style={{
                /* Add styles for 'Medium' button here */
                backgroundColor:
                  selectedRiskLevel === "Medium" ? "#05c7c3" : "transparent",
                color: selectedRiskLevel === "Medium" ? "black" : "black",
              }}
            >
              Medium
            </button>
            <button
              onClick={() => handleRiskLevelClick("High")}
              style={{
                /* Add styles for 'High' button here */
                backgroundColor:
                  selectedRiskLevel === "High" ? "#05c7c3" : "transparent",
                color: selectedRiskLevel === "High" ? "black" : "black",
              }}
            >
              High
            </button>
          </div>
        </>
      )}
      {selectedRiskLevel && (
        <>
          <h1>Please enter a description of the problem:</h1>
          {/* Use Form.Control as textarea */}
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
                ""
              ) : (
                <button onClick={handlePhotoUpload}>Add Photo</button>
              )}
              {photoUploaded && (
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
              )}
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TheOffice;
