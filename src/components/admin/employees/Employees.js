import { Box, Button, Grid, Modal, TextField, Typography, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AdminSideNav from '../admin_side_nav/AdminSideNav';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Employees = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [employees, setEmployees] = useState([]);
    let { companyId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/companies/getAllEmployeeCategory/${companyId}`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`http://localhost:5000/companies/getAllEmployees/${companyId}`)
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [companyId]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddEmployee = () => {
        // Add employee logic here
    };

    const handleUpdateEmployee = (employeeId) => {
        // Update employee logic here
    };

    const handleDeleteEmployee = (employeeId) => {
        // Delete employee logic here
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <AdminSideNav />
            </Grid>
            <Grid item xs={12} md={9}>
                <Box mt={2} mb={2}>
                    <Typography variant="h4" component="h1" align="center">
                        Employees
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-start">
                    <Button variant="contained" color="primary" onClick={handleOpenModal}>
                        Add an Employee
                    </Button>
                </Box>
                <Box mt={2} mb={2}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Password</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee._id}>
                                        <TableCell>{employee.firstName}</TableCell>
                                        <TableCell>{employee.lastName}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell>{employee.password}</TableCell>
                                        <TableCell>{employee.category}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={() => handleUpdateEmployee(employee._id)}>
                                                Update
                                            </Button>
                                            <Button variant="contained" color="error" onClick={() => handleDeleteEmployee(employee._id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Modal open={isModalOpen} onClose={handleCloseModal}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                        <Typography variant="h6" component="h2" align="center" gutterBottom>
                            Add Employee
                        </Typography>
                        <TextField label="First Name" fullWidth margin="normal" />
                        <TextField label="Last Name" fullWidth margin="normal" />
                        <TextField label="Email" fullWidth margin="normal" />
                        <TextField label="Password" type="password" fullWidth margin="normal" />
                        <Select label="Category" fullWidth margin="normal">
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.category}
                                </MenuItem>
                            ))}
                        </Select>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="contained" color="primary" onClick={handleAddEmployee}>
                                Add
                            </Button>
                            <Button variant="contained" color="error" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Grid>
        </Grid>
    );
};

export default Employees;
