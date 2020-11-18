import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import covid_19_logo from '../images/covid-19-logo.png';

const useStyles = makeStyles((theme) => ({
   root: {
     flexGrow: 1,
   },
   menuButton: {
     marginRight: theme.spacing(2),
   },
   title: {
     flexGrow: 1,
   },
 }));
 

function HeaderComponent() {

   const classes = useStyles();

   return (
      <div>
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" className={classes.title}>
                  COVID 19 TRACKER APPLICATION BY M.MUZZAMMIL ASHRAF
            </Typography>
            </Toolbar>
         </AppBar>
         <br /><br />
         <center>
            <img src={covid_19_logo} />
         </center>
      </div>
   )
}

export default HeaderComponent
