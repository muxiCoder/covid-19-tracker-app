import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DataComponent from './DataComponent';
import ChartComponent from './ChartComponent';

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      width: 300,
      marginTop: '20px',
      marginLeft: '38%',
   },
   selectEmpty: {
      marginTop: theme.spacing(2),
   },
}));


function SelectComponent() {

   const classes = useStyles();
   const [data_for, set_data_for] = useState("global");
   const [contries, set_contries] = useState([]);

   useEffect(() => {
      async function fetch_data() {
         const response = await fetch("https://covid19.mathdro.id/api/countries")
            .then(response => response.json())
            .then(data => {
               console.log(data);
               set_contries(data.countries);
            });
      }
      fetch_data();
   }, []);

   return (
      <React.Fragment>
         <div styl={{ textAlign: 'center' }}>
            <FormControl className={classes.formControl}>
               <InputLabel id="country_label">Country</InputLabel>
               <Select
                  labelId="country_label"
                  id="country_select"
                  value={data_for}
                  onChange={e => set_data_for(e.target.value)}
               >
                  <MenuItem value='global'>Global</MenuItem>
                  {
                     contries.map(item => (
                        <MenuItem value={item.name}>{item.name}</MenuItem>
                     ))
                  }
                  
                  <MenuItem value={30}>Thirty</MenuItem>
               </Select>
            </FormControl>
         </div>
         {
            console.log("Data for: ", data_for)
         }
         <DataComponent search_for={data_for} /><br />
         <ChartComponent chart_for={data_for} />
      </React.Fragment>
   )
}

export default SelectComponent;
