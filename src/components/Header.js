import React from 'react';
import { Box, Button } from '@mui/material';

const Header = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:tania@example.com";
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* ... other header content ... */}
      
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#6E41E2', // Purple color from screenshot
          '&:hover': {
            backgroundColor: '#5835B0' // Slightly darker shade for hover
          }
        }}
        onClick={handleEmailClick}
      >
        Email Tania
      </Button>
    </Box>
  );
};

export default Header; 