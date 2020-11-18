import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Line } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
   root: {
     flexGrow: 1,
   },
   paper: {
     padding: theme.spacing(1),
     textAlign: 'center',
     color: theme.palette.text.primary,
   },
}));

const ChartComponent = ({chart_for}) => {
   const classes = useStyles();
   const [covid_data, set_covid_data] = useState({chart_for});
   const [confirmed, setConfirmed] =  useState([]);
   const [active, setActive] =  useState([]);
   const [deaths, setDeaths] =  useState([]);
   const [recovered, setRecovered] =  useState([]);
   const [Dates, setDates] = useState([]);

   const confirmedChart = {
      labels: Dates,
      datasets: [
         {
            label: "Confirmed",
            data: confirmed,
            fill: false,
            borderColor: "yellow"
         }
      ]
   };

   const activeChart = {
      labels: Dates,
      datasets: [
         {
            label: "Active",
            data: active,
            fill: false,
            borderColor: "orange"
         }
      ]
   };

   const deathsChart = {
      labels: Dates,
      datasets: [
         {
            label: "Deaths",
            data: deaths,
            fill: false,
            borderColor: "red"
         }
      ]
   };

   const recoveredChart = {
      labels: Dates,
      datasets: [
         {
            label: "Recovered",
            data: recovered,
            fill: false,
            borderColor: "green"
         }
      ]
   };

   useEffect(() => {
      async function fetch_data() {
         if(chart_for == 'global') {
            const response = await fetch("https://api.covid19api.com/world")
                                    .then(response => response.json())
                                    .then(data => {
                                       setConfirmed(data.map(a => a.TotalConfirmed));
                                       //setActive(data.map(a => a.Active));
                                       setDeaths(data.map(a => a.TotalDeaths));
                                       setRecovered(data.map(a => a.TotalRecovered));
                                    });
         }
         else {
            const response = await fetch(`https://api.covid19api.com/dayone/country/${chart_for}`)
                                    .then(response => response.json())
                                    .then(data => {
                                       setConfirmed(data.map(a => a.Confirmed));
                                       setActive(data.map(a => a.Active));
                                       setDeaths(data.map(a => a.Deaths));
                                       setRecovered(data.map(a => a.Recovered));
                                       setDates(data.map(a => (new Date(a.Date)).toISOString().split('T')[0]));
                                    });
         }
      }
      fetch_data();
   }, [chart_for]);

   return(
      <div>
         <div>

         </div>
         <div>

         </div>
         <Grid container direction="row" justify="center" alignItems="center">
            <Grid item sm={6} className={classes.paper}>
               <Line data={confirmedChart} />
            </Grid>
            <Grid item sm={6} className={classes.paper}>
               <Line data={activeChart} />
            </Grid>
         </Grid> 
         <Grid container direction="row" justify="center" alignItems="center">
            <Grid item sm={6} className={classes.paper}>
               <Line data={deathsChart} />
            </Grid>
            <Grid item sm={6} className={classes.paper}>
               <Line data={recoveredChart} />
            </Grid>
         </Grid>  
      </div>
   )
}

export default ChartComponent;