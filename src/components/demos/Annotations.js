import React, { useRef } from 'react';
import { Box, Typography, Grid, Paper, styled } from '@mui/material';
import { AddPhotoAlternate, LocalOffer, Draw, Straighten } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import PSPDFKit from 'pspdfkit';

const AnnotationOption = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const loadPSPDFKit = async (container, document) => {
  try {
    return await PSPDFKit.load({
      container,
      document,
      baseUrl: '/assets/pspdfkit-lib/',
      styleSheets: ['/assets/pspdfkit-lib/pspdfkit.css'],
    });
  } catch (error) {
    console.error('Failed to load PSPDFKit:', error);
  }
};

const Annotations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const documentPath = searchParams.get('document') || 'Sample.pdf';
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  const options = [
    {
      title: 'Add an Image',
      description: 'Upload an image to your PDF as an annotation. Resize the image, change opacity, and drag it to place it where you want it.',
      icon: <AddPhotoAlternate sx={{ fontSize: 48 }} />,
      path: '/annotations/add-image'
    },
    {
      title: 'Stamp',
      description: 'Add predefined stamps or create custom stamps for your documents.',
      icon: <LocalOffer sx={{ fontSize: 48 }} />,
      path: '/annotations/stamp'
    },
    {
      title: 'Annotate on Image',
      description: 'Draw, highlight, and add text annotations directly on images.',
      icon: <Draw sx={{ fontSize: 48 }} />,
      path: '/annotations/annotate-image'
    },
    {
      title: 'Measurement Tools',
      description: 'Measure distances, areas, and angles in your documents.',
      icon: <Straighten sx={{ fontSize: 48 }} />,
      path: '/annotations/measurement'
    }
  ];

  return (
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
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Annotations
        </Typography>
        <Typography gutterBottom color="text.secondary">
          A plug-and-play PDF annotation library with more than 15 tools that lets you highlight, draw, and add
          shapes, texts, notes, comments, and more.
        </Typography>
        
        <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
          <Box component="span" sx={{ display: 'inline-flex', p: 0.5, borderRadius: 1, bgcolor: 'primary.main', color: 'white' }}>
            ⓘ
          </Box>
          Read more in our guides
        </Box>

        <Grid container spacing={3}>
          {options.map((option) => (
            <Grid item xs={12} md={6} key={option.title}>
              <AnnotationOption onClick={() => navigate(option.path)}>
                {option.icon}
                <Typography variant="h6" mt={2}>
                  {option.title}
                </Typography>
                <Typography color="text.secondary">
                  {option.description}
                </Typography>
              </AnnotationOption>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Annotations; 