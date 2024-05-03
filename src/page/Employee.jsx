import React from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import SearchBar from "./SearchBar";
// import AddEmployee from "./AddEmployee"
import EmployeeTable from "./EmployeeTable"

export default function employee() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <SearchBar/> <br />
          {/* <AddEmployee/> */}
          {/* <EmployeeTable/> */}
        </Box>
      </Box>
    </>
  );
}
