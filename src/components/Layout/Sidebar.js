import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  styled,
  Box,
  Typography,
} from '@mui/material';
import {
  Home as HomeIcon,
  Visibility as ViewerIcon,
  Description as OfficeIcon,
  Image as ImageIcon,
  Edit as EditorIcon,
  Article as ContentEditorIcon,
  ViewQuilt as PageManipulationIcon,
  Crop as CropToolIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  Create as AnnotationsIcon,
  AddPhotoAlternate as AddImageIcon,
  LocalOffer as StampIcon,
  Draw as AnnotateIcon,
  Straighten as MeasurementIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 380,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 380,
    boxSizing: 'border-box',
    marginTop: 64,
    '& .MuiListItem-root': {
      borderBottom: '1px solid #e0e0e0',
    },
    '& .MuiListItemButton-root': {
      padding: '16px 24px',
    },
    '& .MuiListItemIcon-root': {
      color: '#00b894',
      minWidth: '40px',
    },
  },
}));

const menuItems = [
  { 
    text: 'Hello', 
    icon: <HomeIcon sx={{ color: '#00b894' }} />, 
    path: '/' 
  },
  { 
    text: 'Viewer', 
    icon: <ViewerIcon sx={{ color: '#00b894' }} />, 
    path: '/viewer',
    subItems: [
      { 
        text: 'Office Document', 
        icon: <OfficeIcon sx={{ color: '#00b894' }} />, 
        path: '/viewer/office',
        hasArrow: true,
        subContent: {
          description: 'View Word, Excel, and PowerPoint files in your browser. Upload an MS Office file and start annotating, signing, editing, searching, and more.',
          documents: [
            {
              name: 'Paper.docx',
              preview: '/assets/images/Paper.png',
              path: '/Paper.docx'
            },
            {
              name: 'Table.xlsx',
              preview: '/assets/images/Table.png',
              path: '/Table.xlsx'
            },
            {
              name: 'Slides.pptx',
              preview: '/assets/images/Slides.png',
              path: '/Slides.pptx'
            }
          ],
          supportedFormats: '.docx, .doc, .dotx, .docm, .pptx, .ppt, .pptm, .xls, .xlsx, .xlsm'
        }
      },
      { 
        text: 'Image Viewer', 
        icon: <ImageIcon sx={{ color: '#00b894' }} />, 
        path: '/viewer/image',
        hasArrow: true 
      }
    ]
  },
  {
    text: 'Annotations',
    icon: <AnnotationsIcon sx={{ color: '#00b894' }} />,
    path: '/annotations',
    subItems: [
      {
        text: 'Add an Image',
        icon: <AddImageIcon sx={{ color: '#00b894' }} />,
        path: '/annotations/add-image',
        hasArrow: true,
        description: 'Upload an image to your PDF as an annotation. Resize the image, change opacity, and drag it to place it where you want it.'
      },
      {
        text: 'Stamp',
        icon: <StampIcon sx={{ color: '#00b894' }} />,
        path: '/annotations/stamp',
        hasArrow: true,
        description: 'Add predefined stamps or create custom stamps for your documents.'
      },
      {
        text: 'Annotate on Image',
        icon: <AnnotateIcon sx={{ color: '#00b894' }} />,
        path: '/annotations/annotate-image',
        hasArrow: true,
        description: 'Draw, highlight, and add text annotations directly on images.'
      },
      {
        text: 'Measurement Tools',
        icon: <MeasurementIcon sx={{ color: '#00b894' }} />,
        path: '/annotations/measurement',
        hasArrow: true,
        description: 'Measure distances, areas, and angles in your documents.'
      }
    ]
  },
  {
    text: 'Editor',
    icon: <EditorIcon sx={{ color: '#00b894' }} />,
    path: '/editor',
    subItems: [
      {
        text: 'Content Editor',
        icon: <ContentEditorIcon sx={{ color: '#00b894' }} />,
        path: '/editor/content',
        hasArrow: true,
      },
      {
        text: 'Page Manipulation',
        icon: <PageManipulationIcon sx={{ color: '#00b894' }} />,
        path: '/editor/page',
        hasArrow: true,
      },
      {
        text: 'Crop Tool',
        icon: <CropToolIcon sx={{ color: '#00b894' }} />,
        path: '/editor/crop',
        hasArrow: true,
      }
    ]
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSections, setOpenSections] = useState({
    viewer: false,
    annotations: false,
    editor: false
  });

  const handleClick = (item) => {
    if (item.subItems) {
      const sectionKey = item.text.toLowerCase();
      setOpenSections(prev => ({
        ...prev,
        [sectionKey]: !prev[sectionKey]
      }));
      if (item.text === 'Viewer' && item.subItems[0].text === 'Office Document') {
        navigate('/viewer/office?document=/Paper.docx');
      }
    } else {
      navigate(item.path);
    }
  };

  const handleDocumentClick = (doc) => {
    navigate(`/viewer/office?document=${doc.path}`);
  };

  return (
    <StyledDrawer variant="permanent">
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleClick(item)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subItems && (
                  openSections[item.text.toLowerCase()] ? <ExpandMoreIcon /> : <ChevronRightIcon />
                )}
              </ListItemButton>
            </ListItem>
            {item.subItems && openSections[item.text.toLowerCase()] && (
              <List component="div" disablePadding>
                {item.subItems.map((subItem) => (
                  <React.Fragment key={subItem.text}>
                    <ListItemButton
                      selected={location.pathname === subItem.path}
                      onClick={() => navigate(subItem.path)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.text} />
                      {subItem.hasArrow && <ChevronRightIcon />}
                    </ListItemButton>
                    {subItem.subContent && (
                      <Box sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                        <Typography color="text.secondary" paragraph>
                          {subItem.subContent.description}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                          Try converting a document:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                          {subItem.subContent.documents.map((doc) => (
                            <Box
                              key={doc.name}
                              onClick={() => handleDocumentClick(doc)}
                              sx={{
                                flex: 1,
                                cursor: 'pointer',
                                border: location.search === `?document=${doc.path}` ? '2px solid #6333FF' : '1px solid #e0e0e0',
                                borderRadius: 1,
                                overflow: 'hidden'
                              }}
                            >
                              <img
                                src={doc.preview}
                                alt={doc.name}
                                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }}
                              />
                              <Typography align="center" sx={{ p: 1 }}>
                                {doc.name}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                        <Box sx={{ 
                          mx: 2,
                          p: 3,
                          border: '2px dashed #e0e0e0',
                          borderRadius: 1,
                          textAlign: 'center',
                          backgroundColor: '#fafafa'
                        }}>
                          <Box 
                            component="img"
                            src="/cloud-upload.png"
                            alt="upload"
                            sx={{ 
                              width: 32,
                              height: 32,
                              mb: 2,
                              opacity: 0.6
                            }}
                          />
                          <Box>
                            <Typography component="span" sx={{ mr: 1 }}>
                              Drop your document here, or
                            </Typography>
                            <Typography
                              component="span"
                              sx={{ 
                                color: '#6333FF',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                              }}
                            >
                              browse
                            </Typography>
                          </Box>
                          <Typography 
                            variant="caption" 
                            display="block"
                            sx={{
                              color: '#666666',
                              mt: 1
                            }}
                          >
                            Supports {subItem.subContent.supportedFormats}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </React.Fragment>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar; 