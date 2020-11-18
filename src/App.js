import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HeaderComponent from './components/HeaderComponent';
import SelectComponent from './components/SelectComponent';

const appContainer = {
  backgroundColor: '#f7f7f7',
}

function App() {

  return (
    <div style={appContainer}>
      <HeaderComponent /><br />
      <SelectComponent />
    </div>
  );
}

export default App;
