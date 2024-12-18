import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import PSPDFKit from 'pspdfkit';

const Hello = () => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // We need to inform PSPDFKit where to look for its library assets
    const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

    const loadPDF = async () => {
      // Unload any existing instance
      if (instanceRef.current) {
        PSPDFKit.unload(container);
      }

      try {
        instanceRef.current = await PSPDFKit.load({
          container,
          document: '/TaniaCV.pdf',
          baseUrl: baseUrl,
          //theme: document.body.classList.contains('dark') ? 'dark' : 'light',
        });
      } catch (error) {
        console.error('Failed to load PDF:', error);
      }
    };

    loadPDF();

    // Cleanup function
    return () => {
      if (instanceRef.current) {
        PSPDFKit.unload(container);
        instanceRef.current = null;
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Hello Demo
      </Typography>
      <Typography gutterBottom>
        This is the basic PSPDFKit Web SDK demo showing a default PDF document.
      </Typography>
      <Box 
        ref={containerRef} 
        sx={{ 
          height: 'calc(100vh - 240px)',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }} 
      />
    </Box>
  );
};

export default Hello; 