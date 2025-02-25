import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AuthLayout from "../layout/AuthLayout";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import NotFound from "../pages/OtherPage/NotFound";
import Garantias from "../pages/Garantias/Garantias";
import CrearGarantia from "../pages/Garantias/CrearGarantia";
import UserProfiles from "../pages/UserPages/UserProfiles";
import Cuenta from "../pages/Cuentas/Cuenta";
import CrearCuenta from "../pages/Cuentas/CrearCuenta";
import Acreedor from "../pages/Acreedor/Acreedor";
import CrearAcreedor from "../pages/Acreedor/CrearAcreedor";

export default function RoutesApp() {
  return (
    <Routes>
      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/garantias" element={<Garantias />} />
          <Route path="/garantias/crear" element={<CrearGarantia />} />
          {/* <Route path="/garantias/editar/:id" element={<CrearGarantia />} /> */}
          <Route path="/cuenta" element={<Cuenta />} />
          <Route path="/cuenta/crear" element={<CrearCuenta />} />
          {/* <Route path="/cuenta/editar/:id" element={<CrearCuenta />} /> */}
          <Route path="/acreedor" element={<Acreedor />} />
          <Route path="/acreedor/crear" element={<CrearAcreedor />} />
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
