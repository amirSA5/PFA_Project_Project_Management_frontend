import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, TextField } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { css } from '@emotion/react';

const StyledBox = styled(Box)(
    ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f5f5f5;
  `
);

const StyledForm = styled('form')(
    ({ theme }) => css`
    width: 300px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  `
);

const StyledTextField = styled(TextField)(
    ({ theme }) => css`
    margin-bottom: 16px;

    & input {
      padding: 8px;
    }
  `
);

const StyledButton = styled(Button)(
    ({ theme }) => css`
    width: 100%;
  `
);

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(`Logged in with username: ${username} and password: ${password}`);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <StyledBox sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <StyledForm onSubmit={handleLogin}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AccountCircle sx={{ fontSize: '3rem', color: '#3f51b5' }} />
                </Box>
                <StyledTextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={handleUsernameChange}
                    InputProps={{
                        startAdornment: <AccountCircle />,
                    }}
                />
                <StyledTextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                    InputProps={{
                        startAdornment: <Lock />,
                    }}
                />
                <StyledButton type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Login
                </StyledButton>
            </StyledForm>
        </StyledBox>
    );
};

export default UserLogin;
