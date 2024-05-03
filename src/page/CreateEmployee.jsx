import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Button from "@mui/material/Button";
import { Snackbar, Alert } from "@mui/material";
import { createEmployee } from "../service/EmployeeService";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const useStyles = makeStyles(() => ({
  addButton: {
    marginLeft: 100,
  },
}));

function CreateEmployee() {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const setShowModelAsTrue = () => {
    setShowModel(true);
  };

  const handleCloseDialog = () => {
    setShowModel(false);
  };

  const handleSave = () => {
    createEmployee(formData).then((response) => {
      console.log(response.data);
      setSeverity('success');
      setAlertMessage("Employee created successfully...!");
      setOpenSnackbar(true); // Show snackbar after save
    })
    .catch((error) => {
      console.info("Error creating employee:", error.response.data);
      setSeverity('error');
      setAlertMessage(error.response.data.email);
      setOpenSnackbar(true);
    });
    setShowModel(false);
  };

  return (
    <div>
      <IconButton className={classes.addButton} onClick={setShowModelAsTrue}>
        <Button variant="contained">
          <AddIcon />
          Create New
        </Button>
      </IconButton>
      <Dialog open={showModel}>
        <DialogTitle
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            height: "60px",
            textAlign: "center",
          }}
        >
          Create New Employee
        </DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={
              !formData.firstName || !formData.lastName || !formData.email
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        key="snackbar"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreateEmployee;
