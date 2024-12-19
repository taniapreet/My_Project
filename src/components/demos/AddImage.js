import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DragDropArea from '../common/DragDropArea';

const AddImage = () => {
  const [file, setFile] = useState(null);

  const handleFileDrop = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const sampleImages = [
    { name: 'chefs-choice.png', type: 'image' },
    { name: 'icecream.jpg', type: 'image' },
    { name: 'wine.pdf', type: 'pdf' }
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Add an Image
      </Typography>
      <Typography color="text.secondary" paragraph>
        Upload an image to your PDF as an annotation. Resize the image, change opacity, and drag it to
        place it where you want it.
      </Typography>

      <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Box component="span" sx={{ display: 'inline-flex', p: 0.5, borderRadius: 1, bgcolor: 'primary.main', color: 'white' }}>
          ⓘ
        </Box>
        Read more in our guides
      </Box>

      <Typography variant="h6" gutterBottom>
        Try adding an image annotation:
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {sampleImages.map((image) => (
          <Box
            key={image.name}
            sx={{
              width: 100,
              height: 100,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => console.log(`Selected ${image.name}`)}
          >
            <Typography variant="body2">{image.name}</Typography>
          </Box>
        ))}
      </Box>

      <DragDropArea 
        onFileDrop={handleFileDrop}
        text="Drop your document here, or browse"
        supportedFormats=".pdf, .jpg, .png, .tif"
      />
    </Box>
  );
};

export default AddImage; 