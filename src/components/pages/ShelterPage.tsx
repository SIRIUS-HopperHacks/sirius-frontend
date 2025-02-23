import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationBar from "@molecules/BottomNavBar";
import {
  Container,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Search,
  LocalHospital,
  FireTruck,
  LocalPolice,
  LocationOn,
} from "@mui/icons-material";
import ShelterCard from "@molecules/ShelterCard";

const shelters = [
  {
    name: "Mather Hospital",
    distance: "0.5 miles",
    phone: "+1-202-555-0114",
    location: "75 North Country Rd, Port Jefferson, NY 11777",
    lat: 40.9468,
    lng: -73.0681,
    iconType: "hospital",
  },
  {
    name: "Port Jefferson Fire Department",
    distance: "0.7 miles",
    phone: "+1-202-555-0114",
    location: "115 Maple Place, Port Jefferson, NY 11777",
    lat: 40.9461,
    lng: -73.0699,
    iconType: "fire",
  },
  {
    name: "A Police Department",
    distance: "1.2 miles",
    phone: "+1-202-555-0114",
    location: "200 W Main St, Smithtown, NY 11787",
    lat: 40.8553,
    lng: -73.2038,
    iconType: "police",
  },
  {
    name: "B Police Department",
    distance: "1.5 miles",
    phone: "+1-202-555-0114",
    location: "110 Old Country Rd, Mineola, NY 11501",
    lat: 40.7402,
    lng: -73.6407,
    iconType: "police",
  },
  {
    name: "C Police Department",
    distance: "1.7 miles",
    phone: "+1-202-555-0114",
    location: "300 W Main St, Riverhead, NY 11901",
    lat: 40.9170,
    lng: -72.6623,
    iconType: "police",
  },
];

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

const ShelterPage: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredShelters = shelters.filter((shelter) =>
    shelter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/homepage");
    } else if (newValue === 1) {
      navigate("/shelters");
    }
  };

  const handleShelterClick = (shelter: any) => {
    navigate("/shelter-details", { state: { shelter } });
  };

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
      <List>
        {filteredShelters.length > 0 ? (
          filteredShelters.map((shelter, index) => (
            <div key={index} onClick={() => handleShelterClick(shelter)}>
              <ShelterCard
                name={shelter.name}
                distance={shelter.distance}
                phone={shelter.phone}
                icon={getIcon(shelter.iconType)}
              />
            </div>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No results found" />
          </ListItem>
        )}
      </List>
      <BottomNavigationBar value={value} onClick={handleClick} />
    </Container>
  );
};

export default ShelterPage;
