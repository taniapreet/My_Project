import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import PSPDFKit from 'pspdfkit';
import DragDropArea from '../common/DragDropArea';

const ImageViewer = () => {
  const [file, setFile] = useState(null);
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

    if (file && container) {
      const loadImage = async () => {
        // Unload any existing instance
        if (instanceRef.current) {
          PSPDFKit.unload(container);
        }

        try {
          // Convert file to base64
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              instanceRef.current = await PSPDFKit.load({
                container,
                document: e.target.result,
                baseUrl: baseUrl,
              });
            } catch (error) {
              console.error('Failed to load image:', error);
            }
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error('Failed to process image:', error);
        }
      };

      loadImage();
    }

    return () => {
      if (instanceRef.current) {
        PSPDFKit.unload(container);
        instanceRef.current = null;
      }
    };
  }, [file]);

  const handleFileDrop = (files) => {
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      setFile(files[0]);
    } else {
      console.error('Please upload an image file');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Image Viewer
      </Typography>
      {!file ? (
        <DragDropArea onFileDrop={handleFileDrop} />
      ) : (
        <Box 
          ref={containerRef} 
          sx={{ 
            height: 'calc(100vh - 180px)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }} 
        />
      )}
    </Box>
  );
};

export default ImageViewer; 