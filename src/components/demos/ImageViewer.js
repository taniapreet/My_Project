import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PSPDFKit from 'pspdfkit';

const ImageViewer = () => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const documentPath = searchParams.get('document') || 'road.jpg';

  useEffect(() => {
    const container = containerRef.current;

    const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;
    
    PSPDFKit.load({
      container,
      document: '/road.jpg', // Default document
      baseUrl: baseUrl
    }).then(instance => {
      instanceRef.current = instance;
    }).catch(error => {
      console.error('Error loading image:', error);
    });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
    };
  }, [documentPath]);

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

export default ImageViewer; 