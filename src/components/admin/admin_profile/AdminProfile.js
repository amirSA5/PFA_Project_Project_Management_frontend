import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Business from '@mui/icons-material/Business';
import axios from 'axios';
import AdminSideNav from '../admin_side_nav/AdminSideNav';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';


const AdminProfileContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8),
    textAlign: 'center',
    marginBottom: theme.spacing(8),
    zIndex: 1,
    marginLeft: '250px',  // Add this line to push the content to the right
}));

const AdminSideNavContainer = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '250px',
    height: '100%',
});

const CompanyInfoContainer = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(10),
    textAlign: 'center',
    marginBottom: theme.spacing(10),
    zIndex: 0,
    backgroundColor: '#f1f1f1',
    borderRadius: theme.spacing(1),
}));

const CompanyName = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
}));

const CompanyIcon = styled(Business)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));


const GeneralInformationContainer = styled(Box)(({ theme }) => ({
    border: '1px solid #007bff',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
}));

const Title = styled(Typography)(({ theme }) => ({
    color: '#007bff',
    marginBottom: theme.spacing(10),
}));



const Email = styled(Typography)(({ theme }) => ({
    textAlign: 'left',
}));

const PhoneNumber = styled(Typography)(({ theme }) => ({
    textAlign: 'left',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
    color: '#007bff',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

const ChangeInfoContainer = styled(Box)(({ theme }) => ({
    border: '1px solid #007bff',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
    marginTop: theme.spacing(5),
}));

const DeleteAccountContainer = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(10),
    textAlign: 'center',
    marginBottom: theme.spacing(10),
    zIndex: 0,
}));


const AdminProfile = () => {
    const { companyId } = useParams();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [company, setCompany] = useState({});
    const [changedEmail, setChangedEmail] = useState({});
    const [changedPassword, setChangedPassword] = useState({});

    const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);

    const handleDeleteToggle = () => {
        setIsDeleteEnabled((prevValue) => !prevValue);
    };

    const handleDeleteAccount = (companyId) => {
        try {
            axios.get('http://localhost:5000/companies/logout')
            localStorage.removeItem('firstLogin');
            window.location.replace('/company/login');
            const res = axios.delete(`http://localhost:5000/companies/deleteCompany/${companyId}`)
            alert(res.data.msg)
        } catch (err) {
            alert(err.response.data.msg)
        }
    };

    useEffect(() => {
        const checkLoggedIn = () => {
            const firstLogin = localStorage.getItem('firstLogin');
            if (firstLogin) {
                setIsLoggedIn(true);
            }
        };

        const fetchCompany = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/companies/getOneCompanie/${companyId}`
                );
                if (response && response.data) {
                    setCompany(response.data);
                }
            } catch (error) {
                console.error('Error fetching company:', error);
            }
        };

        checkLoggedIn();
        fetchCompany();
    }, [companyId, company]);

    const updateCompany = async (companyId) => {
        try {
            const res = await axios.put(`http://localhost:5000/companies/updateCompany/${companyId}`, {
                email: changedEmail,
                name: changedPassword
            })
            console.log(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <>

            <AdminProfileContainer >
                <CompanyInfoContainer container>
                    <Grid item xs={12}>
                        <PageTitle variant="h4" component="h1" align="center">
                            Company Profile
                        </PageTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <GeneralInformationContainer>
                            <Title variant="h6" component="h2">
                                General Information
                            </Title>
                            <CompanyName variant="body1" align="left">
                                <CompanyIcon /><strong>Company Name:</strong> {company.name}
                            </CompanyName>
                            <Email variant="body1" align="left">
                                <EmailIcon /> <strong>Email:</strong> {company.email}
                            </Email>
                            <PhoneNumber variant="body1" align="left">
                                <PhoneIcon /> <strong>Phone Number:</strong> {company.phoneNumber}</PhoneNumber>
                        </GeneralInformationContainer>
                    </Grid>
                    {/* Add more company information here */}
                </CompanyInfoContainer>
                <Grid item xs={12}>
                    <ChangeInfoContainer>
                        <PageTitle variant="h6" component="h2">
                            Change Password or Email
                        </PageTitle>
                        {/* form or inputs for changing password or email */}
                        <form>
                            <TextField
                                label="New Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                onChange={e => setChangedPassword(e.target.value)}
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="New Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                onChange={e => setChangedEmail(e.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={() => updateCompany(companyId)}>
                                Save Changes
                            </Button>
                        </form>
                    </ChangeInfoContainer>
                </Grid>
                <DeleteAccountContainer container>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2">
                            Delete Account
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Switch checked={isDeleteEnabled} onChange={handleDeleteToggle} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            disabled={!isDeleteEnabled}
                            onClick={() => handleDeleteAccount(companyId)}
                        >
                            Delete My Account
                        </Button>
                    </Grid>
                </DeleteAccountContainer>
            </AdminProfileContainer>
            {isLoggedIn && (
                <AdminSideNavContainer>
                    <AdminSideNav />
                </AdminSideNavContainer>
            )}
        </>

    );
};

export default AdminProfile;
