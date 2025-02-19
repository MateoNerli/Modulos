import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // logica para verificar si el usuario está autenticado
  const isAuthenticated = false;

  //   if (!isAuthenticated) {
  //     return <Navigate to="/signin" />; // Redirige al login si no está autenticado
  //   }

  return <Outlet />; // Si está autenticado, muestra las rutas hijas
};

export default PrivateRoute;
