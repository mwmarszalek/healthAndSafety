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
  const [isLocationDescribed, setIsLocationDescribed] =
    useState<boolean>(false);
  const [selectedProblemType, setSelectedProblemType] = useState<string | null>(
    null
  );
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(
    null
  );
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [descriptionEntered, setDescriptionEntered] = useState<boolean>(false);
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>("");

  // Add this function to handle location description
  const handleLocationDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
  
    if (value === "High") {
      Swal.fire({
        icon: "error",
        title: "Emergency",
        html: "If this is an emergency please call our helpline immediately: <a href='tel:+1234567890'>+1 234 567 890</a>",
      });
    }
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
      title: `Succesfully reported an issue:`,
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
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Photo uploaded successfully!",
      });
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
    fontWeight: "800", // This will make the font bold
  });

  return (
    <div className="theoffice-container">
      <h2 style={{ fontWeight: "bold", margin: ".5em" }}>
        Please describe the location:
      </h2>
      <Form.Control
        as="textarea"
        value={locationDescription}
        onChange={handleLocationDescriptionChange}
        style={{
          marginBottom: "15px",
          width: "50%",
          backgroundColor: "#d5e2e2",
          fontWeight: "bold",
        }}
        placeholder="Enter location description here"
      />
      {!isLocationDescribed ? (
        <button
          onClick={handleContinueButtonClick}
          style={getButtonStyle("Continue", "Continue")}
        >
          Continue
        </button>
      ) : null}
      {isLocationDescribed && (
        <>
          <h2 style={{ fontWeight: "bold", margin: ".5em" }}>
            Please specify a type of Hazard:
          </h2>
          <div className="office-hazard-btns">
            <button
              onClick={() =>
                handleClick(
                  setSelectedProblemType,
                  handleProblemTypeSelection,
                  "Physical"
                )
              }
              style={getButtonStyle(selectedProblemType || "", "Physical")}
            >
              Physical
            </button>
            <button
              onClick={() =>
                handleClick(
                  setSelectedProblemType,
                  handleProblemTypeSelection,
                  "Chemical and Biological"
                )
              }
              style={getButtonStyle(
                selectedProblemType || "",
                "Chemical and Biological"
              )}
            >
              Chemical & Biological
            </button>
            <button
              onClick={() =>
                handleClick(
                  setSelectedProblemType,
                  handleProblemTypeSelection,
                  "Psychosocial"
                )
              }
              style={getButtonStyle(selectedProblemType || "", "Psychosocial")}
            >
              Psychosocial
            </button>
            <button
              onClick={() =>
                handleClick(
                  setSelectedProblemType,
                  handleProblemTypeSelection,
                  "Environmental"
                )
              }
              style={getButtonStyle(selectedProblemType || "", "Environmental")}
            >
              Environmental
            </button>
          </div>
          {selectedProblemType && (
            <>
              <h2 style={{ fontWeight: "bold", margin: ".5em" }}>
                Please select the risk level:
              </h2>
              <div className="office-risk-btns">
                <button
                  onClick={() =>
                    handleClick(
                      setSelectedRiskLevel,
                      handleRiskLevelSelection,
                      "Low"
                    )
                  }
                  style={getButtonStyle(selectedRiskLevel || "", "Low")}
                >
                  Low
                </button>
                <button
                  onClick={() =>
                    handleClick(
                      setSelectedRiskLevel,
                      handleRiskLevelSelection,
                      "Medium"
                    )
                  }
                  style={getButtonStyle(selectedRiskLevel || "", "Medium")}
                >
                  Medium
                </button>
                <button
                  onClick={() =>
                    handleClick(
                      setSelectedRiskLevel,
                      handleRiskLevelSelection,
                      "High"
                    )
                  }
                  style={getButtonStyle(selectedRiskLevel || "", "High")}
                >
                  High
                </button>
              </div>
            </>
          )}
          {selectedRiskLevel && (
            <>
              <h2 style={{ fontWeight: "bold", margin: ".5em" }}>
                Please enter a description of the problem:
              </h2>
              <Form.Control
                as="textarea"
                value={problemDescription}
                onChange={handleDescriptionChange}
                style={{
                  marginBottom: "15px",
                  width: "50%",
                  backgroundColor: "#d5e2e2",
                  fontWeight: "bold",
                }}
                placeholder="Enter problem description here"
              />
              {descriptionEntered && (
                <div className="final-btns-container">
                  {photoUploaded ? (
                    <>
                      <button onClick={handleRemovePhoto}>Remove Photo</button>
                    </>
                  ) : (
                    <button
                      onClick={open}
                      style={
                        photoUploaded
                          ? { backgroundColor: "transparent", color: "black" }
                          : getButtonStyle("Upload Photo", "Upload Photo")
                      }
                    >
                      Upload Photo
                    </button>
                  )}
                  <button
                    onClick={handleSubmit}
                    style={
                      descriptionEntered
                        ? getButtonStyle("Submit", "Submit")
                        : { backgroundColor: "transparent", color: "black" }
                    }
                  >
                    Submit
                  </button>
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
