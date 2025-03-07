import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import UserAddressCard from "../../components/UserProfile/UserAddressCard";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";
import UserMetaCard from "../../components/UserProfile/UserMetaCard";
import { useAuth } from "../../context/AuthContext";
import axiosInterceptor from "../../hooks/axiosInterceptor";

export default function UserProfiles() {
  const [cuenta, setCuenta] = useState<any[]>([]);
  const authcontex = useAuth();
  const { user } = authcontex;

  useEffect(() => {
    if (user?.name) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await axiosInterceptor.get(
        "/api/Usuario/username/" + user?.name
      );
      setCuenta(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <PageMeta title="Perfil" />
      <PageBreadcrumb
        pageTitle="Perfil"
        paths={[
          { name: "Inicio", path: "/" },
          { name: "Perfil", path: "/profile" },
        ]}
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <UserMetaCard cuenta={cuenta} />
          <UserInfoCard cuenta={cuenta} />
          <UserAddressCard cuenta={cuenta} />
        </div>
      </div>
    </>
  );
}
