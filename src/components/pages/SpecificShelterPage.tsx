import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import {
  Phone,
  LocationOn,
  LocalHospital,
  FireTruck,
  LocalPolice,
  Search,
} from "@mui/icons-material";
import Map from "@molecules/Map";
import BottomNavigationBar from "@molecules/BottomNavBar";

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "hospital":
      return <LocalHospital />;
    case "fire":
      return <FireTruck />;
    case "police":
      return <LocalPolice />;
    default:
      return <LocationOn />;
  }
};

const SpecificShelterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(1);

  const handleClick = (newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/homepage");
    } else if (newValue === 1) {
      navigate("/shelters");
    }
  };
  const shelter = location.state?.shelter;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (!shelter) {
    return <Typography align="center">No Shelter Data Available</Typography>;
  }

  return (
    <Container>
      <TextField
        variant="outlined"
        placeholder="Find the location"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "#f0f0f0",
          borderRadius: "20px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              display: "none",
            },
          },
        }}
      />

      <Paper elevation={3} sx={{ borderRadius: "16px", p: 2.5, mb: 2, mt: 2 }}>
        <ListItem component="div" sx={{ padding: 0 }}>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "#980000", color: "white" }}>
              {getIcon(shelter.iconType)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={shelter.name}
            secondary={
              <>
                Distance: {shelter.distance}
                <br />
                {shelter.phone}
              </>
            }
          />
        </ListItem>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Phone color="error" />
          <Typography variant="body2">{shelter.phone}</Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, mb: 2 }}
        >
          <LocationOn color="error" />
          <Typography variant="body2">
            29-59 Northern Blvd, Long Island City, NY 11101
          </Typography>
        </Box>
        <Map />
      </Paper>
      <BottomNavigationBar value={value} onClick={handleClick} />
    </Container>
  );
};

export default SpecificShelterPage;
