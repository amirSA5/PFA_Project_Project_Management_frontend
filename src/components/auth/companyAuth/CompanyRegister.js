import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { AccountCircle, Email, Lock, Phone } from '@mui/icons-material';
import { css } from '@emotion/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
}));

const FormWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 600,
    padding: '2rem',
    borderRadius: '0.5rem',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)',
}));

const StyledTextField = styled(TextField)(() => ({
    marginBottom: '1rem',
}));

const StyledButton = styled(Button)(() => ({
    marginTop: '1rem',
}));

const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
});

const initialValues = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
};

const CompanyRegister = () => {
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [registeredPassword, setRegisteredPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:5000/companies/create', values);
            console.log('Form submitted!', response.data);
            setRegisteredEmail(values.email);
            setRegisteredPassword(values.password);
            navigate('/company/login');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <FormContainer>
            <FormWrapper>
                <Typography variant="h4" component="h1" align="center">
                    Company Registration Form
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form css={css`width: 100%;`} >
                        <Field
                            as={StyledTextField}
                            name="name"
                            label="Full Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: <AccountCircle />,
                            }}
                        />
                        <ErrorMessage name="name" component={Typography} variant="caption" color="error" />

                        <Field
                            as={StyledTextField}
                            name="email"
                            label="Email"
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            type="email"
                            InputProps={{
                                startAdornment: <Email />,
                            }}
                        />
                        <ErrorMessage name="email" component={Typography} variant="caption" color="error" />

                        <Field
                            as={StyledTextField}
                            name="password"
                            label="Password"
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            type="password"
                            InputProps={{
                                startAdornment: <Lock />,
                            }}
                        />
                        <ErrorMessage name="password" component={Typography} variant="caption" color="error" />

                        <Field
                            as={StyledTextField}
                            name="phoneNumber"
                            label="Phone Number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: <Phone />,
                            }}
                        />
                        <ErrorMessage name="phoneNumber" component={Typography} variant="caption" color="error" />

                        <StyledButton variant="contained" color="primary" type="submit" fullWidth>
                            Register
                        </StyledButton>
                    </Form>
                </Formik>

                <Typography variant="body1" align="center">
                    Already have an account?{' '}
                    <Link href="/company/login" underline="hover">
                        Log in
                    </Link>
                </Typography>
            </FormWrapper>
        </FormContainer>
    );
};

export default CompanyRegister;
