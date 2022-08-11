
import './App.css';
import AppLayout from './layout/applayout';
// import Dashboard from './app/pages/Dashboard';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Routing/PrivateRoute';
import Profile from './pages/profile';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <div >
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />

          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<AppLayout >
              <Chat />
            </AppLayout>} />

            <Route exact path='/profile' element={<AppLayout >
              <Profile />
            </AppLayout>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;