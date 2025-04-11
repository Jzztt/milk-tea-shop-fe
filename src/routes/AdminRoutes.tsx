import { Route, Routes } from "react-router";
import AdminLayout from "../layouts/AdminLayout";
import ProductList from "../features/admin/products/ProductList";
import UserList from "../features/admin/users/UserList";
import AdminAddProduct from "../pages/AdminAddProduct";
import Attribute from "../features/admin/attribute/Attribute";
import AttributeValue from "../pages/AttributeValue";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="products" element={<ProductList />} />
        <Route path="add-product" element={<AdminAddProduct />} />
        <Route path="users" element={<UserList />} />
        <Route path="attribute" element={<Attribute />} />
        <Route path="attribute-value" element={<AttributeValue />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;
