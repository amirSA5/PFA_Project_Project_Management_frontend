import { Box, Button, Grid, Modal, TextField, Typography, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AdminSideNav from '../admin_side_nav/AdminSideNav';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Employees = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    let { companyId } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/companies/getAllEmployeeCategory/${companyId}`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get(`http://localhost:5000/companies/getAllEmployee/${companyId}`)
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [companyId, employees]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmployeeEmailChange = (event) => {
        setEmployeeEmail(event.target.value);
    };

    const handleEmployeePasswordChange = (event) => {
        setEmployeePassword(event.target.value);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddEmployee = () => {
        const newEmployee = {
            companyId: companyId,
            categoryId: selectedCategory,
            firstName: firstName,
            lastName: lastName,
            email: employeeEmail,
            password: employeePassword,
        };
        axios.post('http://localhost:5000/companies/createEmployee', newEmployee).then((response) => {
            console.log(response.data);
            setEmployees([...employees, response.data]);
            handleCloseModal();
        });
    };

    const handleUpdateEmployeeModal = (employeeId) => {
        setIsModalOpen(true);
        setSelectedEmployeeId(employeeId);
        const employee = employees.find((employee) => employee._id === employeeId);
        setSelectedCategory(employee.categoryId);
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setEmployeeEmail(employee.email);
        setEmployeePassword(employee.password);
    };

    const handleUpdateEmployee = () => {
        const updatedEmployee = {
            categoryId: selectedCategory,
            firstName: firstName,
            lastName: lastName,
            email: employeeEmail,
            password: employeePassword,
        };
        axios
            .put(`http://localhost:5000/companies/updateEmployee/${selectedEmployeeId}`, updatedEmployee)
            .then((response) => {
                console.log(response.data);
                setEmployees((prevEmployees) =>
                    prevEmployees.map((employee) => {
                        if (employee._id === selectedEmployeeId) {
                            return response.data;
                        } else {
                            return employee;
                        }
                    })
                );
                handleCloseModal();
            })
            .catch((err) => {
                console.log(err);
            });
    };


    
    const handleUpdateModalClose = () => {
        setSelectedEmployeeId(null);
        setSelectedCategory('');
        setFirstName('');
        setLastName('');
        setEmployeeEmail('');
        setEmployeePassword('');
        setIsModalOpen(false);
    };

    const handleDeleteEmployee = (employeeId) => {
        axios
            .delete(`http://localhost:5000/companies/deleteEmployee/${employeeId}`)
            .then((response) => {
                console.log(response);
                setEmployees(employees.filter((employee) => employee._id !== employeeId));
            });
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
                <Box display="flex" justifyContent="flex-start" mb={2}>
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
                                        <TableCell>{employee.categoryId ? categories.find(category => category._id === employee.categoryId)?.category : ''}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={() => handleUpdateEmployeeModal(employee._id)}>
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
                            {selectedEmployeeId ? 'Update Employee' : 'Add Employee'}
                        </Typography>
                        <TextField label="First Name" fullWidth margin="normal" value={firstName} onChange={handleFirstNameChange} />
                        <TextField label="Last Name" fullWidth margin="normal" value={lastName} onChange={handleLastNameChange} />
                        <TextField label="Email" fullWidth margin="normal" value={employeeEmail} onChange={handleEmployeeEmailChange} />
                        <TextField label="Password" type="password" fullWidth margin="normal" value={employeePassword} onChange={handleEmployeePasswordChange} />
                        <Select label="Category" fullWidth margin="normal" value={selectedCategory} onChange={handleCategoryChange}>
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.category}
                                </MenuItem>
                            ))}
                        </Select>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="contained" color="primary" onClick={selectedEmployeeId ? handleUpdateEmployee : handleAddEmployee}>
                                {selectedEmployeeId ? 'Update' : 'Add'}
                            </Button>
                            <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={handleUpdateModalClose}>
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
