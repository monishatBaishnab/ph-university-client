import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import { NavLink } from "react-router-dom";

type TPath = { path: string; element: ReactNode };

type TSidebarItem = {
  key: string;
  label: ReactNode | string;
  children?: { key: string; label: ReactNode }[];
};

const adminPathData = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

export const adminPaths = adminPathData?.reduce((acc: TPath[], item) => {
  if (item.name && item.path) {
    acc.push({ path: item.path, element: item.element });
  }
  if (item.name && item.children) {
    item.children.forEach((childItem) => {
      acc.push({ path: childItem.path, element: childItem.element });
    });
  }
  return acc;
}, []);

export const adminSidebarItems = adminPathData?.reduce(
  (acc: TSidebarItem[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.name && item.children) {
      acc.push({
        label: item.name,
        key: item.name,
        children: item.children.map((subItem) => ({
          key: subItem.name,
          label: <NavLink to={`/admin/${subItem.path}`}>{subItem.name}</NavLink>,
        })),
      });
    }
    return acc;
  },
  []
);