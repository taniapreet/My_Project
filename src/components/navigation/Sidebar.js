/**
 * @file Sidebar.js
 * @description Main navigation sidebar component for the document viewer application.
 * Handles section navigation and image viewer functionality.
 * 
 * @component SidebarNavigation
 * @requires React
 * @requires @mui/material
 * @requires react-router-dom
 */

import React, { useState } from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DocumentDropBox from '../common/DocumentDropBox';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import Collapse from '@mui/material/Collapse';

## Component Documentation

### Sidebar Navigation
The sidebar (`src/components/navigation/Sidebar.js`) provides the main navigation interface and includes:
- Section selection (Hello, Viewer, Office Document, Image Viewer)
- Document preview thumbnails
- File upload functionality
- Section-specific content display

### Document Viewers
1. **PDF Viewer** (`src/components/demos/Viewer.js`)
   - Displays PDF documents
   - Default document: Sample.pdf
   - Supports document annotations

2. **Office Document Viewer** (`src/components/demos/OfficeDocument.js`)
   - Converts and displays Office documents
   - Supports Word, Excel, and PowerPoint files
   - Default document: Paper.docx

3. **Image Viewer** (`src/components/demos/ImageViewer.js`)
   - Displays image files
   - Supports JPG, PNG, and TIFF formats
   - Default image: road.jpg

### Common Components
**DocumentDropBox** (`src/components/common/DocumentDropBox.js`)
- Reusable drag-and-drop file upload component
- Configurable file type restrictions
- Visual feedback for drag events

## Usage
1. **Viewing Documents**
   - Select document type from sidebar
   - Click on sample documents to view
   - Use toolbar for document interactions

2. **Uploading Documents**
   - Drag and drop files onto the upload box
   - Click browse to select files manually
   - Supported formats are displayed in the UI

3. **Document Interaction**
   - Use PSPDFKit toolbar for annotations
   - Zoom and page navigation
   - Search functionality

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- PSPDFKit for document viewing capabilities
- Material-UI for the user interface components

const SidebarNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState('road.jpg');
  const [selectedSection, setSelectedSection] = useState('');
  const [expandedSection, setExpandedSection] = useState('');

  const handleImageSelect = (imageName) => {
    setSelectedImage(imageName);
    navigate(`/image-viewer?document=${imageName}`);
  };

  const handleFileSelect = (file) => {
    const url = URL.createObjectURL(file);
    navigate(`/image-viewer?document=${url}`);
  };

  const handleSectionClick = (section) => {
    if (expandedSection === section) {
      setExpandedSection(''); // Collapse if clicking the same section
    } else {
      setExpandedSection(section); // Expand the clicked section
    }
    setSelectedSection(section);
    
    if (section === 'image-viewer') {
      navigate('/image-viewer?document=road.jpg');
    }
  };

  return (
    <Box sx={{ width: 240, bgcolor: 'background.paper' }}>
      <List>
        {/* Navigation buttons */}
        <ListItem 
          button 
          onClick={() => handleSectionClick('hello')}
          selected={selectedSection === 'hello'}
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Hello" />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleSectionClick('viewer')}
          selected={selectedSection === 'viewer'}
        >
          <ListItemIcon><VisibilityIcon /></ListItemIcon>
          <ListItemText primary="Viewer" />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleSectionClick('office')}
          selected={selectedSection === 'office'}
        >
          <ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
          <ListItemText primary="Office Document" />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleSectionClick('image-viewer')}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <ImageIcon sx={{ color: '#00C08B' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Image Viewer" 
              sx={{ 
                '& .MuiTypography-root': { 
                  fontWeight: selectedSection === 'image-viewer' ? 600 : 400 
                }
              }}
            />
          </Box>
          <ChevronRightIcon 
            sx={{ 
              transform: expandedSection === 'image-viewer' ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.3s'
            }}
          />
        </ListItem>

        {/* Subtext section */}
        <Collapse in={expandedSection === 'image-viewer'}>
          <Box sx={{ px: 3, pb: 2 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: '0.875rem' }}
            >
              View and render JPG, PNG, and TIFF files client-side in our JavaScript image viewer. Upload an image file and start annotating, signing, editing, searching, and more.
            </Typography>
          </Box>
        </Collapse>

        {/* Annotations section */}
        <ListItem 
          button 
          onClick={() => handleSectionClick('annotations')}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <EditIcon sx={{ color: '#00C08B' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Annotations" 
              sx={{ 
                '& .MuiTypography-root': { 
                  fontWeight: selectedSection === 'annotations' ? 600 : 400 
                }
              }}
            />
          </Box>
          <ChevronRightIcon />
        </ListItem>
      </List>

      <Divider />

      {/* Image Viewer Content - Only show when Image Viewer is selected */}
      {selectedSection === 'image-viewer' && (
        <Box>
          <Box sx={{ p: 2 }}>
            {/* Description */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              View and render JPG, PNG, and TIFF files client-side in our JavaScript image viewer. 
              Upload an image file and start annotating, signing, editing, searching, and more.
            </Typography>

            {/* Sample Images Section */}
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Try an image document:
            </Typography>

            {/* Sample Images */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              {['road.jpg', 'credit.tiff', 'paper.png'].map((image) => (
                <Box 
                  key={image}
                  onClick={() => handleImageSelect(image)}
                  sx={{ 
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    component="img"
                    src={`/${image}`}
                    alt={image}
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      objectFit: 'cover',
                      border: '2px solid',
                      borderColor: selectedImage === image ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      transition: 'border-color 0.2s'
                    }}
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block',
                      textAlign: 'center',
                      mt: 0.5 
                    }}
                  >
                    {image}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Document Drop Box */}
            <DocumentDropBox 
              onFileSelect={handleFileSelect}
              acceptedFiles=".pdf,.jpg,.jpeg,.png,.tiff,.tif"
              helpText="Drop your document here, or browse"
            />
          </Box>
          <Divider />
        </Box>
      )}
    </Box>
  );
};

export default SidebarNavigation; 