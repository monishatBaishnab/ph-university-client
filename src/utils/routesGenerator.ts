import { ReactNode } from "react";
import { TUserPath } from "../types";

type TPath = { path: string; element: ReactNode };

const routesGenerator = (items: TUserPath[]) => {
    const routes = items?.reduce((acc: TPath[], item) => {
        if (item.name && item.path) {
            acc.push({ path: item.path, element: item.element });
        }
        if (item.children) {
            item.children.forEach((childItem) => {
                acc.push({ path: childItem.path!, element: childItem.element });
            });
        }
        return acc;
    }, []);

    return routes;
};

export default routesGenerator;
