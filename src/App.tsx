import React, { useState } from "react";
import NavBar from "./components/Navbar";
import "./global.css";
import Inspection from "./components/Inspection";
import OnSite from "./components/OnSite";
import TheOffice from "./components/TheOffice";
import ViolationsList from "./components/ViolationsList";

interface UserInput {
  location: string | null;
  problemType: string | null;
  riskLevel: string | null;
  problemDescription: string | null;
  photoFile: File | null;  // Add this line
  photoURL: string | null;
  // Add other fields as needed
}

const App: React.FC = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<UserInput>({
    location: null,
    problemType: null,
    riskLevel: null,
    problemDescription: null,
    photoFile: null,  // Add this line
    photoURL: null,
  });
  const [violations, setViolations] = useState<UserInput[]>([]); // Store the submitted violations
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track whether the form is submitted

  const handleClick = (location: string) => {
    setLocation(location);
    setUserInput({ ...userInput, location });
    setFormSubmitted(false); // Reset the formSubmitted state when the location is changed
  };

  const handleProblemTypeSelection = (problemType: string) => {
    setUserInput({ ...userInput, problemType });
  };

  const handleRiskLevelSelection = (riskLevel: string) => {
    setUserInput({ ...userInput, riskLevel });
  };

  const handleURLSubmission = (photoFile: File) => {
    setUserInput({ ...userInput, photoFile, photoURL: URL.createObjectURL(photoFile) });
  };

  const handleProblemDescriptionSubmission = (problemDescription: string) => {
    setUserInput({ ...userInput, problemDescription });
    setViolations([...violations, userInput]); // Add the submitted userInput to the violations array
    setFormSubmitted(true); // Set formSubmitted to true when the form is submitted
  };

  const handleGoBack = () => {
    setLocation(null); // Navigate back to the form selection
    setFormSubmitted(false); // Reset the formSubmitted state
  };

  return (
    <div className="content-container">
      {formSubmitted ? (
        <>
          <NavBar />
          <ViolationsList violations={violations} onGoBack={handleGoBack} /> {/* Pass onGoBack prop */}
        </>
      ) : (
        <>
          <NavBar />
          {location === null && <Inspection handleClick={handleClick} />}
          {location === "OnSite" && (
            <OnSite
              handleProblemTypeSelection={handleProblemTypeSelection}
              handleRiskLevelSelection={handleRiskLevelSelection}
              handleProblemDescriptionSubmission={handleProblemDescriptionSubmission}
              handleURLSubmission={handleURLSubmission}
            />
          )}
          {location === "TheOffice" && <TheOffice handleProblemTypeSelection={handleProblemTypeSelection}
              handleRiskLevelSelection={handleRiskLevelSelection}
              handleProblemDescriptionSubmission={handleProblemDescriptionSubmission}
              handleURLSubmission={handleURLSubmission} />}
          {/* Add other location components here if needed */}
        </>
      )}
    </div>
  );
};

export default App;
