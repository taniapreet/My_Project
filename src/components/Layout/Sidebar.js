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
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';

const StyledDrawer = styled(Drawer)({
  width: 280,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 280,
    boxSizing: 'border-box',
    marginTop: 64,
    '& .MuiListItem-root': {
      borderBottom: '1px solid #e0e0e0',
    },
    '& .MuiCollapse-root .MuiListItem-root:last-child': {
      borderBottom: 'none',
    },
    '& .MuiListItemIcon-root': {
      color: '#00b894',
      minWidth: '40px',
    },
    '& .MuiListItemButton-root:hover': {
      backgroundColor: 'rgba(0, 184, 148, 0.04)',
    },
    '& .MuiListItemButton-root.Mui-selected': {
      backgroundColor: 'rgba(0, 184, 148, 0.08)',
    },
  },
});

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
        hasArrow: true 
      },
      { 
        text: 'Image Viewer', 
        icon: <ImageIcon sx={{ color: '#00b894' }} />, 
        path: '/viewer/image',
        hasArrow: true 
      },
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
    viewer: true,
    editor: true
  });

  const handleClick = (item) => {
    if (item.subItems) {
      const sectionKey = item.text.toLowerCase();
      setOpenSections(prev => ({
        ...prev,
        [sectionKey]: !prev[sectionKey]
      }));
    } else {
      navigate(item.path);
    }
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
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subItems && (
                  openSections[item.text.toLowerCase()] ? <ExpandMoreIcon /> : <ChevronRightIcon />
                )}
              </ListItemButton>
            </ListItem>
            {item.subItems && (
              <Collapse in={openSections[item.text.toLowerCase()]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      selected={location.pathname === subItem.path}
                      onClick={() => navigate(subItem.path)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.text} />
                      {subItem.hasArrow && <ChevronRightIcon />}
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar; 