import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { css } from '@emotion/react';
import { AccountCircle, BusinessCenter } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)(
  ({ theme }) => css`
    background-color: blue;
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & svg {
      font-size: 6rem;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    & h3 {
      color: white;
      margin-top: 0.5rem;
      font-size: 1rem;
    }

    &:hover {
      background-color: darkblue;

      & svg {
        transform: scale(1.2);
      }
    }

    @media (max-width: ${theme.breakpoints.values.sm}px) {
      width: 100%;
    }
  `
);

const SecondStyledBox = styled(Box)(
  ({ theme }) => css`
    background-color: hotpink;
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & svg {
      font-size: 6rem;
      color: white;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    & h3 {
      color: white;
      margin-top: 0.5rem;
      font-size: 1rem;
    }

    &:hover {
      background-color: #F64C72;

      & svg {
        transform: scale(1.2);
      }
    }

    @media (max-width: ${theme.breakpoints.values.sm}px) {
      width: 100%;
    }
  `
);

function Home() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <StyledBox>
        <Link to="/user/login">
          <AccountCircle />
        </Link>
        <Box sx={{ textAlign: 'center' }}>
          <h3>I am an employee</h3>
        </Box>

      </StyledBox>
      <SecondStyledBox>
        <Link to="/company/login">
          <BusinessCenter />
        </Link>
        <Box sx={{ textAlign: 'center' }}>
          <h3>I am a company</h3>
        </Box>

      </SecondStyledBox>
    </Box>
  );
}

export default Home;
