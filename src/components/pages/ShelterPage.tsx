import React, { useContext, useEffect, useRef, useState } from "react";
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
import { APIContext } from "@contexts/APIContext";

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

type OrganizationType = "police" | "fire" | "hospital" | "shelter";

interface Shelter {
  placeId: string;
  name: string;
  distance: string;
  phone: string;
  organizationType: OrganizationType,
  location: string;
  placeLocation: string;
  updatedTime: Date;
}

const ShelterPage: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const shelters = useRef<Shelter[]>([]);

  const api = useContext(APIContext);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await api?.getPlaces();
      if (!response) {
        return;
      }
      shelters.current = response;
      setLoading(false);
    }
    fetch();
  },[]);

  const filteredShelters = shelters.current.filter((shelter) =>
    shelter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/homepage");
    } else if (newValue === 1) {
      navigate("/shelters");
    } else if (newValue === 2) {
      navigate("/user-list");
    }
    else if (newValue === 4) {
      navigate("/");
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
                icon={getIcon(shelter.organizationType)}
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
