// MODULES
import { HomeRoutes } from "@/views/home/routes";
import { AuthRoutes } from "@/views/auth/routes";
const routes = [
  ...AuthRoutes,
  ...HomeRoutes,
]



export default routes