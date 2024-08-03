import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminPaths } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: adminPaths
  },
]);

export default router;
