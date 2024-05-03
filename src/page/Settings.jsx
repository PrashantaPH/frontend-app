import React from "react";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Settings() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Typography variant="h34">Welcome to Settings</Typography>
        </Box>
      </Box>
    </>
  );
}
