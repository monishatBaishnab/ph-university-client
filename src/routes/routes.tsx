import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import routesGenerator from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: routesGenerator(adminPaths)
  },
]);

export default router;
