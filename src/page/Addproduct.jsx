import React from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

export default function AddProduct() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Typography variant="h4">Welcome to AddProduct</Typography>
          <Button variant='contained'>Add Product</Button>
        </Box>
      </Box>
    </>
  );
}
