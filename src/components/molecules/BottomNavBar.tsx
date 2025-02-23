import React from "react";
import { Tabs, Tab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface BottomNavigationBarProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  value,
  onChange,
}) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      aria-label="bottom navigation tabs"
      centered
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
        boxShadow: 3,
        "& .MuiTabs-indicator": {
          backgroundColor: "#d32f2f",
          height: "4px",
        },
      }}
    >
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<HomeIcon />}
      />
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<SearchIcon />}
      />
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<ModeCommentIcon />}
      />
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<AccountCircleIcon />}
      />
    </Tabs>
  );
};

export default BottomNavigationBar;
