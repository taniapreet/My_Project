import React from 'react';
import { Button } from '@material-ui/core';

const handleEmailClick = () => {
  window.location.href = "mailto:tania@example.com";
};

const Header: React.FC = () => {
  return (
    <div>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleEmailClick}
      >
        Email Tania
      </Button>
    </div>
  );
};

export default Header; 