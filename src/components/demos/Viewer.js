import React from 'react';
import { Box, Typography, Grid, Paper, styled } from '@mui/material';
import { Description as OfficeIcon, Image as ImageIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ViewerOption = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Viewer = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Image Viewer',
      description: 'View and edit JPG, PNG, and TIFF files',
      icon: <ImageIcon sx={{ fontSize: 48 }} />,
      path: '/viewer/image'
    },
    {
      title: 'Office Document',
      description: 'View and edit Word, Excel, and PowerPoint files',
      icon: <OfficeIcon sx={{ fontSize: 48 }} />,
      path: '/viewer/office'
    }
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Document Viewer
      </Typography>
      <Typography gutterBottom color="text.secondary">
        Fast, accurate, and reliable document rendering in your browser. 
        View PDFs, image files, and MS Office documents within a flexible and fully customizable UI.
      </Typography>
      <Grid container spacing={3} mt={2}>
        {options.map((option) => (
          <Grid item xs={12} sm={6} key={option.title}>
            <ViewerOption onClick={() => navigate(option.path)}>
              {option.icon}
              <Typography variant="h6" mt={2}>
                {option.title}
              </Typography>
              <Typography color="text.secondary">
                {option.description}
              </Typography>
            </ViewerOption>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Viewer; 