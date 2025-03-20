import {
  FaBox,
  FaCog,
  FaRegIdBadge,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  roles?: string[];
  subItems?: {
    name: string;
    path: string;
    roles?: string[];
    pro?: boolean;
    new?: boolean;
  }[];
};

export const navItems: NavItem[] = [
  {
    icon: <FaRegIdBadge />,
    name: "Dashboard",
    path: "/",
    roles: ["Usuario", "Admin"],
  },
  {
    icon: <FaUser />,
    name: "Cuenta",
    path: "/cuenta",
    roles: ["Usuario", "Admin"],
  },
  {
    icon: <FaUserCircle />,
    name: "Acreedor",
    path: "/acreedor",
    roles: ["Usuario", "Admin"],
  },
  {
    icon: <FaBox />,
    name: "Garantias",
    subItems: [
      {
        name: "Garantias",
        path: "/garantias",
        roles: ["Usuario", "Admin"],
        pro: false,
      },
    ],
  },
  {
    icon: <FaCog />,
    name: "Configuraciones",
    roles: ["Admin"],
    subItems: [
      { name: "Usuarios", path: "/usuarios", roles: ["Admin"], pro: false },
      { name: "Bancos", path: "/bancos", roles: ["Admin"], pro: false },
    ],
  },
];
