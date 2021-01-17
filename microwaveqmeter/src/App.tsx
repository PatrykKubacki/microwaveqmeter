import React from 'react';
import { NavBar } from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import './App.css';

const App: React.FC = () => {
  return (
      <Router>
        <header>
          <NavBar />
        </header>
        <div className="container">
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/settings" component={SettingsPage} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
