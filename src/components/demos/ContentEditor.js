import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DragDropArea from '../common/DragDropArea';

const ContentEditor = () => {
  const [file, setFile] = useState(null);

  const handleFileDrop = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Content Editor
      </Typography>
      <Typography color="text.secondary" paragraph>
        Quickly edit, resize, and move text boxes in your PDF with our content editor. 
        Launch the editor, select the paragraph you want to edit, modify the text, and save your changes.
      </Typography>

      <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Box component="span" sx={{ display: 'inline-flex', p: 0.5, borderRadius: 1, bgcolor: 'primary.main', color: 'white' }}>
          ⓘ
        </Box>
        Read more in our guides
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mb: 4 }}
        onClick={() => console.log('Launch Content Editor')}
      >
        Launch Content Editor
      </Button>

      <DragDropArea 
        onFileDrop={handleFileDrop}
        text="Drop your document here, or browse"
        supportedFormats=".pdf"
      />
    </Box>
  );
};

export default ContentEditor; 