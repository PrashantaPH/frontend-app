import * as React from "react";
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { listEmployees } from '../service/EmployeeService';
import UpdateEmployee from "./UpdateEmployee";
import DeleteEmploee from "./DeleteEmploee";

export default function EmployeeTable(props) {
  const { searchInputData } = props;
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    listEmployees().then((response) => {
      setEmployees(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const setShowModelAsTrue = (employee) => {
    setFormData({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
    });
  };

  const showModelDeleteDialog = (id) => {
    setEmployeeId(id);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchInputData.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchInputData.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "firstName", headerName: "First name", width: 120 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", type: "email", width: 180},
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, employee) => `${employee.firstName || ""} ${employee.lastName || ""}`,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      renderCell: (employee) => (
        <>
          <EditRoundedIcon sx={{color: '#FF6500', cursor: 'pointer', marginRight: 6}} onClick={() => setShowModelAsTrue(employee)} />
          <DeleteRoundedIcon sx={{color: '#C40C0C', cursor: 'pointer', marginRight: 3}} onClick={() => showModelDeleteDialog(employee.id)} />
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 390, width: "100%" }}>
      <DataGrid
        rows={filteredEmployees}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]} checkboxSelection
      />
      <UpdateEmployee formData={formData} setFormData={setFormData} />
      <DeleteEmploee employeeId={employeeId} />
    </div>
  );
}
