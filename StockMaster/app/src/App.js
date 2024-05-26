import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';
import DashboardA from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import Suppliers from './pages/Admin/Suppliers';
import Items from './pages/Admin/Items';
import Orders from './pages/Admin/Orders';
import Profil from './pages/Admin/Profil';
import Register from './pages/Register';

import DashboardU from './pages/User/Dashboard';

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/*" element={<Login />} />
                <Route path="/StockMaster/Login" element={<Login />} />
                <Route path="/StockMaster/RecoverPassword" element={<RecoverPassword />} />
                {/* ADMIN PAGES */}
                <Route path="/StockMaster/admin/Dashboard" element={<DashboardA />} />
                <Route path="/StockMaster/admin/Users" element={<Users />} />
                <Route path="/StockMaster/admin/Suppliers" element={<Suppliers />} />
                <Route path="/StockMaster/admin/Items" element={<Items />} />
                <Route path="/StockMaster/admin/Orders/:id?" element={<Orders />} />
                <Route path="/StockMaster/admin/Account/Profil" element={<Profil />} />
                <Route path="/StockMaster/Register" element={<Register />} />
                {/* USER PAGES */}
                <Route path="/StockMaster/user/Dashboard" element={<DashboardU />} />
            </Routes>
        </Router>
    )
}

export default App;

