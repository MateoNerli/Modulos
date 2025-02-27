import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AuthLayout from "../layout/AuthLayout";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import NotFound from "../pages/OtherPage/NotFound";
import Garantias from "../pages/Garantias/Garantias";
import FormGarantia from "../pages/Garantias/FormGarantia";
import UserProfiles from "../pages/UserPages/UserProfiles";
import Cuenta from "../pages/Cuentas/Cuenta";
import Acreedor from "../pages/Acreedor/Acreedor";
import FormCuenta from "../pages/Cuentas/FormCuenta";
import FormAcreedor from "../pages/Acreedor/FormAcreedor";

export default function RoutesApp() {
  return (
    <Routes>
      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/garantias" element={<Garantias />} />
          <Route path="/garantias/crear" element={<FormGarantia />} />
          <Route path="/garantias/editar/:id" element={<FormGarantia />} />
          <Route path="/cuenta" element={<Cuenta />} />
          <Route path="/cuenta/crear" element={<FormCuenta />} />
          <Route path="/cuenta/editar/:id" element={<FormCuenta />} />
          <Route path="/acreedor" element={<Acreedor />} />
          <Route path="/acreedor/crear" element={<FormAcreedor />} />
          <Route path="/acreedor/editar/:id" element={<FormAcreedor />} />
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
