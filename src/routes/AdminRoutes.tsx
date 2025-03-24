import React from "react";
import { Route, Routes } from "react-router";
import AdminLayout from "../layouts/AdminLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
