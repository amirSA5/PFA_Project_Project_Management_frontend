import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { css } from '@emotion/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { React } from 'react'
import { useParams } from 'react-router-dom';


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
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const initialValues = {
    email: '',
    password: '',
};

const CompanyLogin = () => {

    let { companyId } = useParams();




    const handleSubmit = async (values) => {
        
        try {
            await axios.post('http://localhost:5000/companies/login', { ...values }).then((res) => {
                companyId = res.data.company._id
                localStorage.setItem('firstLogin', true)
                console.log(companyId)
                window.location.href = `/admin/profile/${companyId}`;
            })



        } catch (err) {
            alert(err.response.data.msg)
        }
    };


    return (
        <FormContainer>
            <FormWrapper>
                <Typography variant="h4" component="h1" align="center">
                    Company Login Form
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form css={css`width: 100%;`}>
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

                        <StyledButton variant="contained" color="primary" type="submit" fullWidth>
                            Login
                        </StyledButton>
                    </Form>
                </Formik>

                <Typography variant="body1" align="center">
                    Don't have an account?{' '}
                    <Link href="/company/register" underline="hover">
                        Register
                    </Link>
                </Typography>
            </FormWrapper>
        </FormContainer>
    );
};

export default CompanyLogin;
