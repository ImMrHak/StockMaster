import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';
import Dashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import Suppliers from './pages/Admin/Suppliers';
import Items from './pages/Admin/Items';
import Orders from './pages/Admin/Orders';
import Profil from './pages/Admin/Profil';

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/*" element={<Login />} />
                <Route path="/StockMaster/Login" element={<Login />} />
                <Route path="/StockMaster/RecoverPassword" element={<RecoverPassword />} />
                <Route path="/StockMaster/Dashboard" element={<Dashboard />} />
                <Route path="/StockMaster/Users" element={<Users />} />
                <Route path="/StockMaster/Suppliers" element={<Suppliers />} />
                <Route path="/StockMaster/Items" element={<Items />} />
                <Route path="/StockMaster/Orders/:id?" element={<Orders />} />
                <Route path="/StockMaster/Account/Profil" element={<Profil />} />
            </Routes>
        </Router>
    )
}

export default App;

