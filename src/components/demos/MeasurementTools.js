import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, styled } from '@mui/material';
import { 
  Straighten,
  SquareFoot,
  Timeline,
  Architecture,
  Calculate
} from '@mui/icons-material';
import DragDropArea from '../common/DragDropArea';

const ToolButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  padding: theme.spacing(2),
  textAlign: 'left',
  width: '100%',
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(2),
  },
}));

const MeasurementTools = () => {
  const [file, setFile] = useState(null);

  const handleFileDrop = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const tools = [
    {
      name: 'Distance',
      icon: <Straighten />,
      description: 'Measure the distance between two points'
    },
    {
      name: 'Area',
      icon: <SquareFoot />,
      description: 'Calculate the area of a selected region'
    },
    {
      name: 'Perimeter',
      icon: <Timeline />,
      description: 'Measure the perimeter of a selected shape'
    },
    {
      name: 'Angle',
      icon: <Architecture />,
      description: 'Measure angles between lines or surfaces'
    },
    {
      name: 'Calibrate',
      icon: <Calculate />,
      description: 'Set scale and units for accurate measurements'
    }
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Measurement Tools
      </Typography>
      <Typography color="text.secondary" paragraph>
        Measure distances, areas, and angles in your documents with precision. 
        Calibrate measurements to real-world units and export measurement data.
      </Typography>

      <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Box component="span" sx={{ display: 'inline-flex', p: 0.5, borderRadius: 1, bgcolor: 'primary.main', color: 'white' }}>
          ⓘ
        </Box>
        Read more in our guides
      </Box>

      <Typography variant="h6" gutterBottom>
        Measurement Options:
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {tools.map((tool) => (
          <Grid item xs={12} sm={6} key={tool.name}>
            <ToolButton
              variant="outlined"
              startIcon={tool.icon}
              onClick={() => console.log(`Selected ${tool.name} tool`)}
            >
              <Box>
                <Typography variant="subtitle1">{tool.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {tool.description}
                </Typography>
              </Box>
            </ToolButton>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Start Measuring:
      </Typography>

      <DragDropArea 
        onFileDrop={handleFileDrop}
        text="Drop your document here, or browse"
        supportedFormats=".pdf, .jpg, .png"
      />
    </Box>
  );
};

export default MeasurementTools; 