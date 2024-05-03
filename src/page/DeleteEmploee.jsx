import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteEmployee } from '../service/EmployeeService';

export const DeleteEmployee = (props) => {
  const { employeeId } = props;

  const [showModelDelete, setShowModelDelete] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (employeeId !== '') {
      setShowModelDelete(true);
    } else {
      setShowModelDelete(false);
    }
  }, [employeeId]);

  const handleDelete = () => {
    if (employeeId !== '') {
      deleteEmployee(employeeId)
        .then((response) => {
          console.log(response.data);
          setShowModelDelete(false);
          setOpenSnackbar(true);
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
        });
    } else {
      setShowModelDelete(false);
    }
  };

  const showCloseDialog = () => {
    setShowModelDelete(false);
  };

  return (
    <div>
      <Dialog open={showModelDelete}>
        <DialogTitle
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            alignContent: 'center',
            alignItems: 'center',
            width: '400px',
            height: '70px',
          }}
        >
          Are you sure you want to delete?
        </DialogTitle>
        <DialogActions sx={{ height: '90px' }}>
          <Button variant="outlined" sx={{ marginRight: 6 }} onClick={showCloseDialog}>
            Cancel
          </Button>
          <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ marginRight: 8 }} onClick={handleDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar key="snackbar"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
        open={openSnackbar} autoHideDuration={6000}>
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Employee deleted successfully...!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeleteEmployee;