import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, styled } from '@mui/material';
import DragDropArea from '../common/DragDropArea';

const DocumentPreview = styled(Paper)(({ theme }) => ({
  width: '100%',
  aspectRatio: '3/4',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PreviewImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const SAMPLE_DOCUMENTS = [
  { 
    name: 'Paper.docx', 
    type: 'word',
    preview: '/samples/mars.png',
    description: 'Mars surface exploration in past, present, and future'
  },
  { 
    name: 'Chart.xlsx', 
    type: 'excel',
    preview: '/samples/chart.png',
    description: 'Online Sales Tracker'
  },
  { 
    name: 'Slides.pptx', 
    type: 'powerpoint',
    preview: '/samples/slides.png',
    description: 'Data, Sampling, and Variation in Data Sampling'
  },
];

const OfficeDocument = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileDrop = (files) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleSampleClick = (document) => {
    // Handle sample document click
    console.log('Opening sample document:', document.name);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Office Document
      </Typography>
      <Typography color="text.secondary" paragraph>
        View Word, Excel, and PowerPoint files in your browser. Upload an MS Office file and start
        annotating, signing, editing, searching, and more.
      </Typography>
      
      <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Box component="span" sx={{ display: 'inline-flex', p: 0.5, borderRadius: 1, bgcolor: 'primary.main', color: 'white' }}>
          ⓘ
        </Box>
        Read more in our guides
      </Box>

      <Typography variant="h6" gutterBottom>
        Try converting a document:
      </Typography>
      
      <Grid container spacing={3} mb={4}>
        {SAMPLE_DOCUMENTS.map((doc) => (
          <Grid item xs={12} sm={4} key={doc.name}>
            <DocumentPreview onClick={() => handleSampleClick(doc)}>
              <PreviewImage src={doc.preview} alt={doc.name} />
            </DocumentPreview>
            <Typography variant="body2" mt={1}>
              {doc.name}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <DragDropArea 
        onFileDrop={handleFileDrop}
        text="Drop your document here, or browse"
        supportedFormats=".docx, .xlsx, .pptx"
      />

      {selectedFile && (
        <Box mt={3}>
          <Typography>
            Selected file: {selectedFile.name}
          </Typography>
          {/* Add PSPDFKit viewer here */}
        </Box>
      )}
    </Box>
  );
};

export default OfficeDocument; 