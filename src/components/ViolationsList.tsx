import React from 'react';

interface UserInput {
  location: string | null;
  problemType: string | null;
  riskLevel: string | null;
  problemDescription: string | null;
  photoURL: string | null;
  // Add other fields as needed
}

interface ViolationsListProps {
  violations: UserInput[]; // Array of submitted user inputs
  onGoBack: () => void; // Callback function to navigate back
}

const ViolationsList: React.FC<ViolationsListProps> = ({ violations, onGoBack }) => {
  function blobToTempObjectURL(blobURL: string): string {
    try {
      const blob = new Blob([blobURL], { type: 'image/png' }); // Replace 'image/png' with the appropriate image type if needed
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error converting Blob URL:', error);
      return '';
    }
  }

  return (
    <div>
      <h2>Violations List</h2>
      {violations.length === 0 ? (
        <p>No violations submitted yet.</p>
      ) : (
        <>
          <ul>
            {violations.map((violation, index) => (
              <li key={index}>
                <strong>Area:</strong> {violation.location}
                <br />
                <strong>Problem Type:</strong> {violation.problemType}
                <br />
                <strong>Risk Level:</strong> {violation.riskLevel}
                <br />
                <strong>Problem Description:</strong> {violation.problemDescription}
                <br />
                {violation.photoURL && (
                  <>
                   <strong>Photo:</strong> <img src={violation.photoURL} alt="Violation Photo" style={{maxWidth: '200px', maxHeight: '200px'}} />

                  </>
                )}
                {/* Display other fields here if needed */}
              </li>
            ))}
          </ul>
          <button onClick={onGoBack}>Add New Violation</button> {/* Button to navigate back */}
        </>
      )}
    </div>
  );
};

export default ViolationsList;
