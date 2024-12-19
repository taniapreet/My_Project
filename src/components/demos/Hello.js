import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PSPDFKit from 'pspdfkit';

const Hello = () => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const documentPath = searchParams.get('document') || 'Sample.pdf';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const container = containerRef.current;

    const loadDocument = async () => {
      try {
        setIsLoading(true);
        // Make sure any existing instance is unloaded
        if (instanceRef.current) {
          await PSPDFKit.unload(container);
          instanceRef.current = null;
        }

        // Only proceed if component is still mounted
        if (!isMounted) return;

        // Create absolute URL for baseUrl
        const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

        // Load new instance
        instanceRef.current = await PSPDFKit.load({
          container,
          document: '/Sample.pdf',
          baseUrl,
          styleSheets: [`${baseUrl}pspdfkit.css`],
          toolbarItems: PSPDFKit.defaultToolbarItems,
        });
      } catch (error) {
        console.error('Failed to load document:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDocument();

    return () => {
      isMounted = false;
      if (instanceRef.current) {
        PSPDFKit.unload(container);
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

export default Hello; 