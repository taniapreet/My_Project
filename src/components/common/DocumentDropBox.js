import React, { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const DocumentDropBox = ({ onFileSelect, acceptedFiles, helpText }) => {
  const fileInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <Box
      onClick={() => fileInputRef.current?.click()}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        borderRadius: 1,
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: isDragActive ? 'action.hover' : 'transparent',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'rgba(0, 0, 0, 0.04)'
        }
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFiles}
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
      <CloudUploadIcon 
        sx={{ 
          fontSize: 24, 
          color: 'text.secondary', 
          mb: 1,
          opacity: 0.6
        }} 
      />
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        Drop your document here,
        <br />
        or <Box component="span" sx={{ color: 'primary.main' }}>browse</Box>
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {helpText}
      </Typography>
    </Box>
  );
};

export default DocumentDropBox; 