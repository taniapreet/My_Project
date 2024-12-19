import React from 'react';
import { Box, styled } from '@mui/material';

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const LogoSymbol = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 4px)',
  gridTemplateRows: 'repeat(3, 4px)',
  gap: '2px',
  padding: '2px',
});

const Dot = styled(Box)({
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  backgroundColor: '#000',
});

const Logo = () => {
  return (
    <LogoContainer>
      <LogoSymbol>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </LogoSymbol>
    </LogoContainer>
  );
};

export default Logo; 