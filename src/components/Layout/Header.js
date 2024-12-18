import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  styled,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '../../contexts/ThemeContext';

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const LogoSection = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ButtonSection = styled('div')`
  display: flex;
  gap: 8px;
`;

function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <StyledToolbar>
        <LogoSection>
          <Typography variant="h6" component="div">
            Nutrient
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Web SDK
          </Typography>
        </LogoSection>
        <ButtonSection>
          <IconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Button variant="contained" color="primary">
            E-Mail Tania
          </Button>
        </ButtonSection>
      </StyledToolbar>
    </AppBar>
  );
}

export default Header; 