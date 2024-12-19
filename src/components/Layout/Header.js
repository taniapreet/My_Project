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
import Logo from '../common/Logo';

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
  height: 64,
});

const LogoSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const ButtonSection = styled('div')({
  display: 'flex',
  gap: '8px',
});

const BrandName = styled(Typography)({
  fontWeight: 500,
  fontSize: '20px',
  letterSpacing: '-0.5px',
});

function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <StyledToolbar>
        <LogoSection>
          <Logo />
          <BrandName variant="h6" component="div">
            Nutrient
          </BrandName>
        </LogoSection>
        <ButtonSection>
          <IconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Button variant="contained" color="primary">
            Contact Sales
          </Button>
        </ButtonSection>
      </StyledToolbar>
    </AppBar>
  );
}

export default Header; 