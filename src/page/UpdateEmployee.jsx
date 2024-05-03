import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import { Snackbar, Alert } from "@mui/material";
import { updateEmployee } from "../service/EmployeeService";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

function UpdateEmployee(props) {
  const { formData, setFormData } = props; // Destructure formData and setFormData from props

  const [showModel, setShowModel] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if (formData && formData.firstName !== '' && formData.lastName !== '' && formData.email !== '') {
      setShowModel(true);
    } else {
      setShowModel(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Call setFormData from props to update formData in parent component
  };

  const handleCloseDialog = () => {
    setShowModel(false);
  };

  const handleSave = () => {
    updateEmployee(formData.id, formData)
      .then((response) => {
        console.log(response.data);
        setSeverity('success');
        setAlertMessage("Employee updated successfully...!");
        setOpenSnackbar(true); // Show snackbar after save
      })
      .catch((error) => {
        console.error("Error updating employee:", error.response.data);
        setSeverity('error');
        setAlertMessage(error.response.data.email);
        setOpenSnackbar(true);
      });
    setShowModel(false);
  };

  return (
    <div>
      <Dialog open={showModel}>
        <DialogTitle
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            height: "60px",
            textAlign: "center",
          }}
        >
          Update Employee
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
      <Snackbar key="snackbar"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
        open={openSnackbar} autoHideDuration={6000}>
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

export default UpdateEmployee;
