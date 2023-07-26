import React from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert library

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

  // Function to show SWAL popup when the violations list is empty
  const showEmptyViolationsPopup = () => {
    Swal.fire({
      icon: 'info',
      title: 'No Violations Added',
      text: 'There are no violations added yet.',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/'; // Navigate to the home page when the "OK" button is clicked
      }
    });
  };

  return (
    <div>
     
      {violations.length === 0 ? (
        <>
          {showEmptyViolationsPopup()} {/* Show the SWAL popup if the violations list is empty */}
          
        </>
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
          <button onClick={onGoBack}>Add New Violation</button>
        </>
      )}
    </div>
  );
};

export default ViolationsList;
