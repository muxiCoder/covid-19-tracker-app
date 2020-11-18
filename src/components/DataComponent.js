import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const childContainer = {
   display: 'flex',
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'space-between',
   padding: '0px 20px',
   marginTop: '5%',
}

const childConfirmed = {
   flexGrow: 1,
   fontSize: '20px',
   width: '20%',
   textAlign: 'center',
   margin: '0px 20px',
   borderRadius: '20px',
   padding: '20px 0px',
   backgroundColor: '#f5b461',
}
const childDeath = {
   flexGrow: 1,
   fontSize: '20px',
   width: '20%',
   textAlign: 'center',
   margin: '0px 20px',
   borderRadius: '20px',
   padding: '20px 0px',
   backgroundColor: '#f3eac2',
}
const childRecovered = {
   flexGrow: 1,
   fontSize: '20px',
   width: '20%',
   textAlign: 'center',
   margin: '0px 20px',
   borderRadius: '20px',
   padding: '20px 0px',
   backgroundColor: '#9ad3bc',
}
const childActive = {
   flexGrow: 1,
   fontSize: '20px',
   width: '20%',
   textAlign: 'center',
   margin: '0px 20px',
   borderRadius: '20px',
   padding: '20px 0px',
   backgroundColor: '#ec524b',
}

// const useStyles = makeStyles((theme) => ({
//    root: {
//       flexGrow: 1,
//    },
//    paper: {
//       padding: theme.spacing(1),
//       textAlign: 'center',
//       color: theme.palette.text.primary,
//    },
// }));

const DataComponent = ({ search_for }) => {
   //const classes = useStyles();
   const [covid_data, set_covid_data] = useState([]);
   let result;

   useEffect(() => {
      async function fetch_data() {
         if (search_for == 'global') {
            const response = await fetch("https://api.covid19api.com/summary")
               .then(response => response.json())
               .then(data => {
                  console.log(data);
                  set_covid_data({
                     Confirmed: data.Global['TotalConfirmed'],
                     Deaths: data.Global['TotalDeaths'],
                     Recovered: data.Global['TotalRecovered'],
                     Active: data.Global['TotalConfirmed'] - data.Global['TotalDeaths'] - data.Global['TotalRecovered'],
                  });
               });
         }
         else {
            const response = await fetch(`https://api.covid19api.com/dayone/country/${search_for}`)
               .then(response => response.json())
               .then(data => {
                  set_covid_data(data[data.length - 1]);
               });
         }
      }
      fetch_data();
   }, [search_for]);

   return (
      <div style={childContainer}>
         <div style={childConfirmed}>
            <h3>Confirmed</h3>
            <h3>{covid_data.Confirmed}</h3>
         </div>
         <div style={childDeath}>
            <h3>Deaths</h3>
            <h3>{covid_data.Deaths}</h3>
         </div>
         <div style={childRecovered}>
            <h3>Recovered</h3>
            <h3>{covid_data.Recovered}</h3>
         </div>
         <div style={childActive}>
            <h3>Active</h3>
            <h3>{covid_data.Active}</h3>
         </div>
         {/* <Grid container direction="row" justify="center" alignItems="center">
         <Grid item sm={3} className={classes.paper}>
            
         </Grid>
         <Grid item sm={3} className={classes.paper}>
            
         </Grid>
         <Grid item sm={3} className={classes.paper}>
            
         </Grid>
         <Grid item sm={3} className={classes.paper}>
            
         </Grid>
      </Grid>   */}
      </div>
   );
}

export default DataComponent;