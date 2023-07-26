// App.tsx
import React, { useState } from "react";
import NavBar from "./components/Navbar";
import "./global.css";
import Inspection from "./components/Inspection";
import OnSite from "./components/OnSite";
import TheOffice from "./components/TheOffice";


interface UserInput {
  problemType: string | null;
  riskLevel: string | null;
  problemDescription: string | null;
  // Add other fields as needed
}

const App: React.FC = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<UserInput>({ problemType: null, riskLevel: null, problemDescription: null });

  const handleClick = (location: string) => {
    setLocation(location);
  };

  const handleProblemTypeSelection = (problemType: string) => {
    setUserInput({ ...userInput, problemType });
  };

  const handleRiskLevelSelection = (riskLevel: string) => {
    setUserInput({ ...userInput, riskLevel });
  };

  const handleProblemDescriptionSubmission = (problemDescription: string) => {
    setUserInput({ ...userInput, problemDescription });
  };


  return (
    <div className="content-container">
      <NavBar />
      {location === null && <Inspection handleClick={handleClick} />}
      {location === 'OnSite' && <OnSite handleProblemTypeSelection={handleProblemTypeSelection} handleRiskLevelSelection={handleRiskLevelSelection} handleProblemDescriptionSubmission={handleProblemDescriptionSubmission} />}
      {location === 'TheOffice' && <TheOffice />}
    </div>
  );
};

export default App;
