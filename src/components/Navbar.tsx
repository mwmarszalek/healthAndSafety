import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ViolationsList from './ViolationsList';
import { UserInput } from '../App';
import Swal from 'sweetalert2'; // Import SweetAlert library


interface NavBarProps {
  violations: UserInput[]; // Array of submitted user inputs (assuming UserInput interface is imported here)
}

const NavBar: React.FC<NavBarProps> = ({ violations }) => {
  const [showViolations, setShowViolations] = useState(false);

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

  const handleViolationsClick = () => {
    if (violations) {
      setShowViolations(true)
    }
    if(!showViolations && !violations) {
    showEmptyViolationsPopup()
  }
    
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="/">Miller Homes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Only show the Violations link */}
            <Nav.Link onClick={handleViolationsClick}>Violations</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* Render the ViolationsList component conditionally */}
      {showViolations && <ViolationsList violations={violations} onGoBack={() => setShowViolations(false)} />}
    </>
  );
};

export default NavBar;
