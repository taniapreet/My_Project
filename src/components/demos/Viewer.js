import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import PSPDFKit from 'pspdfkit';

const Viewer = () => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

    // Initialize PSPDFKit with Sample.pdf as default
    PSPDFKit.load({
      container,
      document: '/Sample.pdf',
      baseUrl: baseUrl
    }).then(instance => {
      instanceRef.current = instance;
    }).catch(error => {
      console.error('Error loading PDF:', error);
    });

    return () => {
      // Cleanup
      if (instanceRef.current) {
        if (typeof instanceRef.current.destroy === 'function') {
          instanceRef.current.destroy();
        }
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <Box 
      sx={{ 
        display: 'flex',
        width: '100%',
        height: '100%',
        pl: 0,
        position: 'absolute',
        left: '240px',
        right: 0
      }}
    >
      <Box 
        ref={containerRef} 
        sx={{ 
          width: '100%',
          height: 'calc(100vh - 64px)',
          bgcolor: 'white',
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

export default Viewer; 