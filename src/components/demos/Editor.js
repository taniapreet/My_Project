import React, { useRef } from 'react';
import { Box, Typography, Grid, Paper, styled } from '@mui/material';
import { Article as ContentEditorIcon, ViewQuilt as PageManipulationIcon, Crop as CropToolIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import PSPDFKit from 'pspdfkit';

const EditorOption = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Editor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const documentPath = searchParams.get('document') || 'Sample.pdf';
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  const options = [
    {
      title: 'Content Editor',
      description: 'Quickly edit, resize, and move text boxes in your PDF with our content editor.',
      icon: <ContentEditorIcon sx={{ fontSize: 48 }} />,
      path: '/editor/content'
    },
    {
      title: 'Page Manipulation',
      description: 'Drag, drop, and reorder pages in a document. Select a page to delete, duplicate, or rotate.',
      icon: <PageManipulationIcon sx={{ fontSize: 48 }} />,
      path: '/editor/page'
    },
    {
      title: 'Crop Tool',
      description: 'Select the cropping tool and drag a rectangle around the area you want to crop.',
      icon: <CropToolIcon sx={{ fontSize: 48 }} />,
      path: '/editor/crop'
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
          Editor
        </Typography>
        <Typography gutterBottom color="text.secondary">
          Quickly deploy PDF editing features in your application. Edit PDF text and manipulate pages
          directly in the browser: add, merge, rotate, reorder, and delete document pages.
        </Typography>
        
        <Box component="a" href="#" sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
          <Box component="span" sx={{ display: 'inline-flex', p: 0.5, borderRadius: 1, bgcolor: 'primary.main', color: 'white' }}>
            ⓘ
          </Box>
          Read more in our guides
        </Box>

        <Grid container spacing={3}>
          {options.map((option) => (
            <Grid item xs={12} md={4} key={option.title}>
              <EditorOption onClick={() => navigate(option.path)}>
                {option.icon}
                <Typography variant="h6" mt={2}>
                  {option.title}
                </Typography>
                <Typography color="text.secondary">
                  {option.description}
                </Typography>
              </EditorOption>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Editor; 