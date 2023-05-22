import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import { AccountCircle, Business, Group, Category, ExitToApp, Dashboard } from '@mui/icons-material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const DrawerContainer = styled(Box)(({ theme }) => ({
    width: '250px',
    position: 'fixed',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 'auto',
    },
}));

const DrawerContent = styled(Box)({
    padding: '20px',
});

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
});

const StyledLogo = styled(Typography)({
    fontWeight: 'bold',
});

const StyledListItem = styled(ListItem)({
    marginBottom: '10px',
});

const StyledListItemIcon = styled(ListItemIcon)({
    marginRight: '10px',
});

const AdminSideNav = () => {
    let { companyId } = useParams();

    const logoutCompany = async () => {
        await axios.get('http://localhost:5000/companies/logout');
        localStorage.removeItem('firstLogin');
        window.location.replace('/company/login');
    };

    return (
        <DrawerContainer sx={{ backgroundColor: 'hotpink' }}>
            <Drawer variant="permanent">
                <StyledToolbar>
                    <StyledLogo variant="h6">Logo</StyledLogo>
                </StyledToolbar>
                <DrawerContent>
                    <List>
                        <Link to={`/admin/profile/${companyId}`}>
                            <StyledListItem button>
                                <StyledListItemIcon>
                                    <AccountCircle />
                                </StyledListItemIcon>
                                <ListItemText primary="Profile" />
                            </StyledListItem>
                        </Link>
                        <StyledListItem button>
                            <StyledListItemIcon>
                                <Business />
                            </StyledListItemIcon>
                            <ListItemText primary="My Projects" />
                        </StyledListItem>
                        <Link to={`/admin/Employees/${companyId}`}>
                        <StyledListItem button>
                            <StyledListItemIcon>
                                <Group />
                            </StyledListItemIcon>
                            <ListItemText primary="Employees" />
                        </StyledListItem>
                        </Link>
                        <Link to={`/admin/EmployeCategory/${companyId}`}>
                            <StyledListItem button>
                                <StyledListItemIcon>
                                    <Category />
                                </StyledListItemIcon>
                                <ListItemText primary="Employees Category" />
                            </StyledListItem>
                        </Link>
                        <Link to={`/admin/dashbord/${companyId}`}>
                            <StyledListItem button>
                                <StyledListItemIcon>
                                    <Dashboard />
                                </StyledListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </StyledListItem>
                        </Link>
                    </List>
                    <StyledListItem button onClick={logoutCompany}>
                        <StyledListItemIcon>
                            <ExitToApp />
                        </StyledListItemIcon>
                        <ListItemText primary="Logout" />
                    </StyledListItem>
                </DrawerContent>
            </Drawer>
        </DrawerContainer>
    );
};

export default AdminSideNav;
