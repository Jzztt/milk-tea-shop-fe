import { Route, Routes } from "react-router";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
}

export default App;
