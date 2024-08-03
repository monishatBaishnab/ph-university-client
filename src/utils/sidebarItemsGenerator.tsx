import { ReactNode } from "react";
import { TUserPath } from "../types";
import { NavLink } from "react-router-dom";

type TSidebarItems = {
    key: string;
    label: ReactNode | string;
    children?: TSidebarItems;
}[];

const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
    const sidebarItems = items?.reduce((acc: TSidebarItems, item: TUserPath) => {
        if (item.name && item.path) {
            acc.push({
                key: item.name,
                label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
            });
        }
        if (item.name && item.children) {
            acc.push({
                label: item.name,
                key: item.name,
                children: item.children.map((subItem) => ({
                    key: subItem.name,
                    label: <NavLink to={`/${role}/${subItem.path}`}>{subItem.name}</NavLink>,
                })),
            });
        }
        return acc;
    }, []);

    return sidebarItems;
};

export default sidebarItemsGenerator;
