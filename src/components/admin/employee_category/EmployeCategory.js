import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, TextareaAutosize, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Box } from '@mui/material';
import AdminSideNav from '../admin_side_nav/AdminSideNav';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddCategoryButton = styled(Button)`
  margin-top: 16px;
`;

const ModalContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
`;

const EmployeCategory = () => {
    const [openModal, setOpenModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    let {companyId} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/companies/getAllEmployeeCategory/${companyId}`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                console.log(err);   
            });
    }, [categories,companyId]);

    const handleAddCategory = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAdd = () => {
        const newCategory = {
            companyId:companyId,
            category: categoryName,
            description: description,
        };
        axios.post("http://localhost:5000/companies/createEmployeeCategory", newCategory)
        console.log(companyId)
        setCategoryName('');
        setDescription('');
        setOpenModal(false);
    };

    const handleDelete = (_id) => {
        axios.delete(`http://localhost:5000/companies/deleteEmployeeCategory/${_id}`)
            .then((response) => {
                console.log(response);
            }
            )
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <AdminSideNav />
            </Grid>
            <Grid item xs={12} md={9}>
                <Box mt={2} mb={2}>
                    {/* Add space between title and button */}
                    <Typography variant="h4" component="h1" align="center">
                        Employee Category
                    </Typography>
                </Box>
                <AddCategoryButton variant="contained" onClick={handleAddCategory}>
                    Add Category
                </AddCategoryButton>
                <Box mt={2} mb={2}>
                    {/* Add space between button and table */}
                    {/* Table */}
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category._id}>
                                        <TableCell>{category.category}</TableCell>
                                        <TableCell>{category.description}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDelete(category._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* Rest of the content */}
                </Box>
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Add Category</DialogTitle>
                    <ModalContent>
                        {/* Modal content */}
                        <TextField
                            label="Employee Category"
                            placeholder="Employee Category"
                            fullWidth
                            margin="dense"
                            value={categoryName}
                            onChange={handleCategoryNameChange}
                        />
                        <TextareaAutosize
                            placeholder="Description"
                            rowsMin={3}
                            fullWidth
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </ModalContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleAdd}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    );
};

export default EmployeCategory;
