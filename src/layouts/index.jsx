import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/CustomHeader";
import Sidebar from "../components/CustomSidebar";

// const Layout = () => {
//     const { user, loading } = useAuth();
//   return (
//     {user ? <PublicLayout /> : <PrivateLayout />}
//   )
// }

export const PrivateLayout = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <Outlet />
    </>
  );
};

export const PublicLayout = () => {
  return <Outlet />;
};
