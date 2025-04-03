import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { SIDEBAR_WIDTH } from "../../utils/Constants";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const isActiveRoute = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setOpenModal(false);
  };

  const menuItems = [
    { path: "/", icon: "home", label: "Home" },
    { path: "/expenses", icon: "credit-card", label: "Expenses" },
    { path: "/trips", icon: "plane", label: "Trips" },
    { path: "/approval", icon: "clipboard-check", label: "Approvals" },
    { path: "/settings", icon: "sliders", label: "Settings" },
    { path: "/support", icon: "phone", label: "Support" },
  ];

  return (
    <aside
      className={`bg-background-light border-r border-secondary-DEFAULT w-[${SIDEBAR_WIDTH}] fixed left-0 top-16 h-[calc(100vh-64px)] shadow-card overflow-y-auto flex flex-col`}
    >
      <nav className="flex flex-col p-4 flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              isActiveRoute(item.path)
                ? "bg-primary-light/10 text-primary-DEFAULT"
                : "text-text-secondary hover:bg-secondary-light"
            }`}
          >
            <i className={`fa fa-${item.icon} mr-3`}></i> {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-secondary-DEFAULT">
        <Button
          variant="contained"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={() => setOpenModal(true)}
          className="!bg-danger-DEFAULT hover:!bg-danger-dark normal-case"
        >
          Logout
        </Button>
      </div>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="xs"
        fullWidth
        className="rounded-lg"
      >
        <DialogTitle className="bg-primary-DEFAULT text-white px-6 py-4">
          Confirm Logout
        </DialogTitle>
        <DialogContent className="p-6">
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions className="p-4 border-t border-secondary-DEFAULT">
          <Button
            onClick={() => setOpenModal(false)}
            variant="outlined"
            className="!border-primary-DEFAULT !text-primary-DEFAULT hover:!bg-primary-light/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            className="!bg-danger-DEFAULT hover:!bg-danger-dark ml-2"
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </aside>
  );
};

export default Sidebar;
