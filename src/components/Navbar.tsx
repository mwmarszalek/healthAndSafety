import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserInput } from '../App';
import Swal from 'sweetalert2'; // Import SweetAlert library
import Logo2 from '../assets/344px-Miller_Homes_logo.svg.png';

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
    if (violations.length > 0) {
      setShowViolations(true);
    } else {
      showEmptyViolationsPopup();
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom bg-body-tertiary">
        <Navbar.Brand href="/">
          <img src={Logo2} alt="Logo" style={{ marginLeft: '2em' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <div style={{ marginLeft: 'auto' }}> {/* Use a div to wrap the DropdownButton */}
            <DropdownButton
              id="dropdown-basic-button"
              title="Menu"
              style={{ width: 'auto', minWidth: '12em' }} // Adjust the width and minWidth
            >
              <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleViolationsClick}>Violations</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Reports</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-3">Settings</Dropdown.Item>
            </DropdownButton>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
