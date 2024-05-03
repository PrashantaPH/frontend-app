import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Button from "@mui/material/Button";
import {Snackbar,Alert,} from "@mui/material";
import { createEmployee } from "../service/EmployeeService";
import EmployeeTable from "./EmployeeTable";
import { CreateOrUpdateEmployee } from "./UpdateEmployee";
import CreateEmployee from "./CreateEmployee";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "110%",
  },
  searchBar: {
    width: "50%",
    marginRight: theme.spacing(1),
  },
}));

function SearchBar() {
  const classes = useStyles();
  const [searchInputData, setSearchInputData] = useState('');

  const handleInputChange = (event) => {
    setSearchInputData(event.target.value);
  };

  return (
    <div>
      <div className={classes.root}>
        <TextField
          className={classes.searchBar}
          variant="outlined"
          placeholder="Search..."
          value={searchInputData}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <IconButton edge="start">
                <SearchRoundedIcon />
              </IconButton>
            ),
          }}
        />
        <CreateEmployee/>
      </div> <br />
      <EmployeeTable searchInputData={searchInputData}></EmployeeTable>
    </div>
  );
}

export default SearchBar;
