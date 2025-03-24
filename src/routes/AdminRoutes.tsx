import { Route, Routes } from "react-router";
import AdminLayout from "../layouts/AdminLayout";
import ProductList from "../features/admin/products/ProductList";
import UserList from "../features/admin/users/UserList";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="products" element={<ProductList />} />
        <Route path="users" element={<UserList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
