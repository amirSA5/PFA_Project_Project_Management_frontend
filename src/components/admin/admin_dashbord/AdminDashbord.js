import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import AdminSideNav from '../admin_side_nav/AdminSideNav';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const CompanyInfoContainer = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
}));

const AdminDashbord = () => {
    let { companyId } = useParams();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [company, setCompany] = useState({});

    useEffect(() => {
        // Check if user is logged in (you can use your own logic here)
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
    }, [companyId]);

    

    return (
        <>
            {isLoggedIn && <AdminSideNav />}
            <CompanyInfoContainer container>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" align="center">
                        Company Dashboard
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" align="center">
                        Company Name: {company.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" align="center">
                        <EmailIcon /> Email: {company.email}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" align="center">
                        <PhoneIcon /> Phone Number: {company.phoneNumber}
                    </Typography>
                </Grid>
                {/* Add more company information here */}
            </CompanyInfoContainer>
        </>
    );
};

export default AdminDashbord;
