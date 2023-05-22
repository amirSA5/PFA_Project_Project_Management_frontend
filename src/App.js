import { React, useState } from 'react';
import './App.css';
import Home from './components/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from './components/auth/usersAuth/UserLogin';
import CompanyLogin from './components/auth/companyAuth/CompanyLogin';
import CompanyRegister from './components/auth/companyAuth/CompanyRegister';
import AdminDashbord from './components/admin/admin_dashbord/AdminDashbord';
import AdminSideNav from './components/admin/admin_side_nav/AdminSideNav'; // Import your SideNav component
import AdminProfile from './components/admin/admin_profile/AdminProfile';
import EmployeCategory from './components/admin/employee_category/EmployeCategory';
import Employees from './components/admin/employees/Employees';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    // Perform your login logic here
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Authentification */}
        <Route
          path="/user/login"
          element={<UserLogin handleLogin={handleLogin} />}
        />

        <Route
          path="/company/login"
          element={<CompanyLogin handleLogin={handleLogin} />}
        />

        {/* Register */}
        <Route path="/company/register" element={<CompanyRegister />} />

        {/* admin pages */}
        <Route
          path="/admin/dashbord/:companyId"
          element={<AdminDashbord />}
        />

        <Route
          path="/admin/profile/:companyId"
          element={<AdminProfile />}
        />
        <Route
          path="/admin/EmployeCategory/:companyId"
          element={<EmployeCategory />}
        />

        <Route
          path="/admin/Employees/:companyId"
          element={<Employees />}
        />

        {/* Show SideNav only when logged in */}
        {isLoggedIn && <AdminSideNav handleLogout={handleLogout} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
