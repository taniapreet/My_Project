import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, styled } from '@mui/material';
import { 
  Brush, 
  FormatColorFill, 
  TextFields, 
  Create,
  Highlight 
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

const AnnotateImage = () => {
  const [file, setFile] = useState(null);

  const handleFileDrop = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const tools = [
    {
      name: 'Draw',
      icon: <Brush />,
      description: 'Free-form drawing with customizable color and thickness'
    },
    {
      name: 'Fill',
      icon: <FormatColorFill />,
      description: 'Fill areas with color or patterns'
    },
    {
      name: 'Text',
      icon: <TextFields />,
      description: 'Add text annotations with custom fonts and styles'
    },
    {
      name: 'Highlight',
      icon: <Highlight />,
      description: 'Highlight important areas with transparent colors'
    }
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Annotate on Image
      </Typography>
      <Typography color="text.secondary" paragraph>
        Draw, highlight, and add text annotations directly on images. Use our comprehensive 
        set of annotation tools to mark up your images with precision.
      </Typography>

      <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Box component="span" sx={{ display: 'inline-flex', p: 0.5, borderRadius: 1, bgcolor: 'primary.main', color: 'white' }}>
          ⓘ
        </Box>
        Read more in our guides
      </Box>

      <Typography variant="h6" gutterBottom>
        Available Tools:
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

      <DragDropArea 
        onFileDrop={handleFileDrop}
        text="Drop your image here, or browse"
        supportedFormats=".jpg, .png, .tif"
      />
    </Box>
  );
};

export default AnnotateImage; 