import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const DropZone = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DragDropArea = ({ onFileDrop, text = "Drop your document here, or browse", supportedFormats = ".pdf, .jpg, .png, .tif" }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFileDrop(files);
  };

  return (
    <DropZone
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input').click()}
    >
      <input
        id="file-input"
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => onFileDrop(Array.from(e.target.files))}
      />
      <CloudUpload sx={{ fontSize: 48, color: 'text.secondary' }} />
      <Typography variant="h6" color="text.secondary" mt={2}>
        {text}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Supports {supportedFormats}
      </Typography>
    </DropZone>
  );
};

export default DragDropArea; 