import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, styled } from '@mui/material';
import DragDropArea from '../common/DragDropArea';
import { Check, Clear, AccessTime, Star } from '@mui/icons-material';

const StampPreview = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Stamp = () => {
  const [file, setFile] = useState(null);

  const handleFileDrop = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const stamps = [
    { name: 'Approved', icon: <Check color="success" />, color: 'success.main' },
    { name: 'Rejected', icon: <Clear color="error" />, color: 'error.main' },
    { name: 'Pending', icon: <AccessTime color="warning" />, color: 'warning.main' },
    { name: 'Priority', icon: <Star color="primary" />, color: 'primary.main' },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Stamp
      </Typography>
      <Typography color="text.secondary" paragraph>
        Add predefined stamps or create custom stamps for your documents. Choose from a variety of 
        built-in stamps or upload your own custom designs.
      </Typography>

      <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Box component="span" sx={{ display: 'inline-flex', p: 0.5, borderRadius: 1, bgcolor: 'primary.main', color: 'white' }}>
          ⓘ
        </Box>
        Read more in our guides
      </Box>

      <Typography variant="h6" gutterBottom>
        Try using a stamp:
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stamps.map((stamp) => (
          <Grid item xs={12} sm={6} key={stamp.name}>
            <StampPreview onClick={() => console.log(`Selected ${stamp.name} stamp`)}>
              {stamp.icon}
              <Typography variant="body1" color={stamp.color}>
                {stamp.name}
              </Typography>
            </StampPreview>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Upload custom stamp:
      </Typography>

      <DragDropArea 
        onFileDrop={handleFileDrop}
        text="Drop your stamp image here, or browse"
        supportedFormats=".png, .jpg, .svg"
      />
    </Box>
  );
};

export default Stamp; 