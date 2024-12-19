import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PSPDFKit from 'pspdfkit';

const ViewerComponent = () => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const documentPath = searchParams.get('document') || 'Sample.pdf';

  // ... existing PSPDFKit loading code ...

  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        pl: 0
      }}
    >
      <Box 
        ref={containerRef} 
        sx={{ 
          width: '100%',
          maxWidth: '850px',
          height: 'calc(100vh - 64px)',
          bgcolor: 'white',
          ml: 0,
          borderLeft: '1px solid',
          borderColor: 'divider',
          '& iframe': {
            border: 'none',
            width: '100%',
            height: '100%'
          }
        }} 
      />
    </Box>
  );
};

export default ViewerComponent; 