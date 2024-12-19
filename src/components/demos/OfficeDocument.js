import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PSPDFKit from 'pspdfkit';
import DocumentDropBox from '../common/DocumentDropBox';

const OfficeDocument = () => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const documentPath = searchParams.get('document') || 'Paper.docx';

  useEffect(() => {
    const container = containerRef.current;

    const loadDocument = async () => {
      try {
        console.log('Current instances:', PSPDFKit.instances);
        
        if (instanceRef.current) {
          console.log('Unloading existing instance:', instanceRef.current);
          await PSPDFKit.unload(container);
          instanceRef.current = null;
        }

        // Try to unload any instance that might be using this container
        try {
          const existingInstance = PSPDFKit.instances.find(
            instance => instance.container === container
          );
          if (existingInstance) {
            console.log('Found existing instance for container:', existingInstance);
            await PSPDFKit.unload(existingInstance.container);
          }
        } catch (e) {
          console.log('Error checking existing instances:', e);
        }

        console.log('Loading new instance...');
        const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

        await PSPDFKit.unload(container);

        instanceRef.current = await PSPDFKit.load({
          container,
          document: documentPath,
          baseUrl,
          styleSheets: [`${baseUrl}pspdfkit.css`],
        });
        console.log('New instance loaded:', instanceRef.current);
      } catch (error) {
        console.error('Failed to load document:', error);
      }
    };

    loadDocument();

    // Cleanup function
    return () => {
      const cleanup = async () => {
        if (instanceRef.current) {
          await PSPDFKit.unload(container);
          instanceRef.current = null;
        }
      };
      cleanup();
    };
  }, [documentPath]);

  const handleFileSelect = (file) => {
    // Handle the selected file
    console.log('File selected:', file);
    // Add your file processing logic here
  };

  return (
    <>
      {/* Sidebar Content */}
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          View Word, Excel, and PowerPoint files in your browser. Upload an MS Office file and
          start annotating, signing, editing, searching, and more.
        </Typography>
      </Box>

      {/* PDF Viewer */}
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
    </>
  );
};

export default OfficeDocument; 