import React from "react";
import { Tabs, Tab } from "@mui/material";
import {
  Home,
  Search,
  ModeComment,
  AccountCircle,
  Logout,
} from "@mui/icons-material";

interface BottomNavigationBarProps {
  value: number;
  onClick: (newValue: number) => void;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  value,
  onClick,
}) => {
  return (
    <Tabs
      value={value}
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
        icon={<Home />}
        onClick={() => onClick(0)}
      />
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<Search />}
        onClick={() => onClick(1)}
      />
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<ModeComment />}
        onClick={() => onClick(2)}
      />
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<AccountCircle />}
        onClick={() => onClick(3)}
      />
      <Tab
        sx={{
          color: "#980000",
          "&.Mui-selected": { color: "#cc0000" },
          "&:hover": { color: "#cc0000" },
        }}
        icon={<Logout />}
        onClick={() => onClick(4)}
      />
    </Tabs>
  );
};

export default BottomNavigationBar;
