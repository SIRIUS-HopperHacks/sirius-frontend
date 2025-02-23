import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationBar from "@molecules/BottomNavBar";
import {
  Container,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import Map from "@molecules/Map";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();
    setValue(newValue);
    if (newValue === 0) {
      navigate("/homepage");
    }
    else if (newValue === 1) {
      navigate("/shelters");
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = (confirmed: boolean) => {
    setOpen(false);
    if (confirmed) {
      console.log("Confirmed!");
    } else {
      console.log("Cancelled!");
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", height: "80vh" }}>
        <Map />
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: "5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <Button variant="contained" color="error" onClick={handleOpenDialog}>
          Alert
        </Button>
      </Box>
      <Dialog open={open} onClose={() => handleCloseDialog(false)}>
        <DialogTitle>Are you sure you need help?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleCloseDialog(true)} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <BottomNavigationBar value={value} onChange={handleChange} />
    </Container>
  );
};

export default HomePage;
