import React from 'react';
import { Box, styled } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Hello from '../demos/Hello';
import Viewer from '../demos/Viewer';
import ImageViewer from '../demos/ImageViewer';
import OfficeDocument from '../demos/OfficeDocument';
import Editor from '../demos/Editor';
import ContentEditor from '../demos/ContentEditor';
import PageManipulation from '../demos/PageManipulation';
import CropTool from '../demos/CropTool';
import Annotations from '../demos/Annotations';
import AddImage from '../demos/AddImage';
import Stamp from '../demos/Stamp';
import AnnotateImage from '../demos/AnnotateImage';
import MeasurementTools from '../demos/MeasurementTools';
import '../../styles/main.css';

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  marginLeft: 380,
  marginTop: 64,
  backgroundColor: theme.palette.background.default,
}));

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <MainContent>
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/viewer" element={<Viewer />} />
          <Route path="/viewer/image" element={<ImageViewer />} />
          <Route path="/viewer/office" element={<OfficeDocument />} />
          <Route path="/annotations" element={<Annotations />} />
          <Route path="/annotations/add-image" element={<AddImage />} />
          <Route path="/annotations/stamp" element={<Stamp />} />
          <Route path="/annotations/annotate-image" element={<AnnotateImage />} />
          <Route path="/annotations/measurement" element={<MeasurementTools />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/content" element={<ContentEditor />} />
          <Route path="/editor/page" element={<PageManipulation />} />
          <Route path="/editor/crop" element={<CropTool />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainContent>
    </Box>
  );
};

export default Layout; 