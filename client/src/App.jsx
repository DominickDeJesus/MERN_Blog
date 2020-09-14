import React from 'react';
import { AppContextProvider } from './context/AppContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Dashboard';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/update-password" component={UpdatePassword} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
};

export default App;
