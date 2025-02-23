import React, { useState, useContext } from "react";
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
import { APIContext } from "@contexts/APIContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const api = useContext(APIContext);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  // Set random user location
  const userLocation = { lat: 40.7128, lng: -74.006 };

  const handleClick = (newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/homepage");
    }
    else if (newValue === 1) {
      navigate("/shelters");
    }
    else if (newValue === 2) {
      navigate("/user-list");
    }
    else if (newValue === 4) {
      navigate("/");
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = async (confirmed: boolean) => {
    setOpen(false);
    if (confirmed) {
      await api?.sendToNearbyUsers();
      await api?.alertToServer();
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
        <Map center={userLocation} />
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
      <BottomNavigationBar value={value} onClick={handleClick} />
    </Container>
  );
};

export default HomePage;
