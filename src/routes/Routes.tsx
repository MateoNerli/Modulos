import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserProfiles from "../pages/UserProfiles";
import AuthLayout from "../layout/AuthLayout";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import NotFound from "../pages/OtherPage/NotFound";

export default function RoutesApp() {
  return (
    <Routes>
      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfiles />} />
        </Route>
      </Route>

      {/* Layout de autenticación */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Ruta de fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
